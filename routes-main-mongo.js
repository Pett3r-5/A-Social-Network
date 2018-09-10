const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('connect-flash')
const bcrypt = require('bcryptjs')
const mysql = require('mysql')
const session = require('express-session')
const path = require('path')
const app = express()
const formidable = require('formidable')
const mongoClient = require('mongodb').MongoClient
let ObjectID = require('mongodb').ObjectID;
const multer  = require('multer')
const crypto = require('crypto')

let upload = multer({ dest: 'user_images/' })
const LocalStrategy = require('passport-local').Strategy

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname))
app.set('trust proxy', 1) // trust first proxy
app.use(passport.initialize())
bcrypt.genSalt(10, (err, salt) => {
  if (err) console.log(err)
  app.use(session({ secret: salt, resave: true, saveUninitialized: true })) // If your application uses persistent login sessions, passport.session() middleware must also be used.
})

app.use(flash()) // flash eh a mensagem padrao de erro ou sucesso de login do passport

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'user_images/')
  },
  filename: function (req, file, cb) {
    let extensao = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
    let nomeRandom = crypto.randomBytes(18).toString('hex')
    console.log('inter ' + JSON.stringify(file, undefined, 4));
    cb(null, nomeRandom + extensao);
  }
});

upload = multer({ storage });

let user = {nome: '', id: '', imagem: '', authToken: ''}

passport.use(new LocalStrategy( // o filtro de buscar o usuario no banco de dados.
  function (username, password, done) {
    mongoClient.connect('mongodb://localhost:27017/User', { useNewUrlParser: true }, (err, client) => {
      if (err) console.log(`Não conseguiu se conectar ao servidor mongo: ${err}`)

      const db = client.db('User')
      db.collection('User').findOne({nome: username}).then((docs) => {
        console.log('print:' + docs)
        if (docs === null) {
          console.log('usuario nao achado' + err)
          client.close()
          return done(null, false)
        } else {
          bcrypt.compare(password, docs.password, (err, resul) => {
            if (err) {
              console.log(err)
            }
            if (resul === false) {
              client.close()
              console.log('false')
              return done(null, false)
            } else {
              console.log('true')
              user = docs
              console.log('aham ' + JSON.stringify(docs, undefined, 4));
              client.close()
              return done(null, user)
            }
          })
        }
      }, (err) => {
        console.log('usuario nao achado' + err)
        client.close()
        return done(null, false)
      })
    })
  })
)

passport.serializeUser(function (user, done) {
  done(null, user._id)
})

passport.deserializeUser(function (id, done) {
  mongoClient.connect('mongodb://localhost:27017/User', { userNewUrlParser: true }, (err, client) => {
    if (err) console.log(`Não conseguiu se conectar ao servidor mongo: ${err}`)
    const db = client.db('User')
    db.collection('User').findOne({_id: id}).then((docs) => {
      user = docs
      client.close()
      done(err, user)
    }).catch((err) => console.log(err))
  })
})

app.post('/', passport.authenticate('local', { failureRedirect: '/nada', failureFlash: true }), (req, res) => {
  user.nome = req.user.nome
  user._id = req.user._id
  console.log('uhu' + JSON.stringify(req.user, undefined, 4))
  user.authToken = req.user.auth_token
  user.imagem = req.user.imagem
  res.redirect(`/home:${user._id}`) // esse user.id tá vindo do done(null, user) do localStrategy
}) // aqui passport.authenticate eh um middleware, entao depois ainda pode ter o (req,res) => {}

app.get('/home:id', (req, res) => {
  let usuario = {_id: req.params.id.substring(req.params.id.indexOf(':') + 1, req.params.id.length), nome: '', imagem: '', amigos: '', posts: ''}
  mongoClient.connect('mongodb://localhost:27017/User', { useNewUrlParser: true }, (err, client) => {
    if (err) console.log(err)
    const db = client.db('User')
    db.collection('User').findOne({_id: new ObjectID(usuario._id)}).then((docs) => {
      console.log('retorno ' + JSON.stringify(docs, undefined, 4))
      console.log('aaa' + docs.imagem);
      usuario.nome = docs.nome
      usuario.imagem = docs.imagem
      usuario.amigos = docs.amigos_id
      usuario.posts = docs.posts
      res.render(path.join(__dirname, '/views/home.hbs'), usuario)
    }).catch((err) => console.log(err))
  })
}) // aqui passport eh um middleware, entao depois ainda pode ter o (req,res) =>

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.get('/config:id', passport.authenticate('local', { successRedirect: `/config:${user.authToken}`, failureRedirect: '/nada', failureFlash: true }), (req, res) => {
  res.send('foi')
})

app.post('/home',  upload.single('fileToUpload'), (req, res) => {
  console.log('body: ' + JSON.stringify(req.body, undefined, 4))
  // console.log('userCadastro: ' + JSON.parse(req, undefined, 4))
  if (req.body.user_cadastro) {
    let cadastro = {user: req.body.user_cadastro, email: req.body.email_cadastro, password: req.body.senha_cadastro, auth_token: req.body.user_cadastro, imagem:'./user_images/avatar.jpg'}
    if (req.file) {
      console.log('VAII ' + req.file.filename);
      cadastro.imagem = req.file.filename;
      console.log('req.file.fileName ' + JSON.stringify(req.file, undefined, 4))
    }
    // if (!validator.isEmail(cadastro.email_cadastro)) {
    //   res.send('email invalido')
    // }
    console.log('cadastro.imagem fora ' + cadastro.imagem);
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err)
      }
      bcrypt.hash(cadastro.password, salt, (err, hash) => {
        if (err) {
          console.log(err)
        }
        cadastro.password = hash
      })
      bcrypt.hash(cadastro.auth_token, salt, (err, hash) => {
        if (err) {
          console.log(err)
        }
        cadastro.auth_token = hash
      })
    })
    // cadastro.auth_token = jwt.sign(cadastro.user, 'galinha').toString()
    mongoClient.connect('mongodb://localhost:27017/User', { useNewUrlParser: true }, (err, client) => {
      if (err) console.log(`Não conseguiu se conectar ao servidor mongo: ${err}`)
      const db = client.db('User')
      db.collection('User').findOne({nome: cadastro.user}).then((docs) => {
        console.log('docos: ' + docs)
        if (docs === null) {
          db.collection('User').insertOne({nome: cadastro.user, email: cadastro.email, password: cadastro.password, auth_token: cadastro.auth_token, imagem: cadastro.imagem, amigos_id: [], posts: []}).then((docs) => {
            console.log('entrou ' + docs)
            client.close()
            res.redirect(`/`)
          }, (err) => console.log('unable', err))
        } else {
          res.send('usuario já cadastrado')
          client.close()
        }
      }).catch((err) => console.log(err))
    })
  }
})

app.get('/search', (req, res) => {
  mongoClient.connect('mongodb://localhost:27017/User', { useNewUrlParser: true }, (err, client) => {
    if (err) console.log(`Não conseguiu se conectar ao servidor mongo: ${err}`)
    const db = client.db('User')
    db.collection('User').findOne({nome : {$regex : ".*"+ req.body.data +".*"}}).then((docs) => {
      json.send(docs.nome)
    }).catch((err) => console.log(err))
  })
})

app.get('/:user', (req, res) => {
  mongoClient.connect('mongodb://localhost:27017/User', { useNewUrlParser: true }, (err, client) => {
    if (err) console.log(`Não conseguiu se conectar ao servidor mongo: ${err}`)
    const db = client.db('User')
    db.collection('User').findOne({nome : req.params.user}).then((docs) => {
      json.send(docs.nome)
    }).catch((err) => console.log(err))
  })
})

app.listen(3001)
