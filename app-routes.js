const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const hbs = require('hbs')
var exphbs = require('express-handlebars')

const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy

const mongoClient = require('mongodb').MongoClient
let ObjectID = require('mongodb').ObjectID
const multer = require('multer')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const util = require('util')

const getUser = require('./routes/get-user.js')
const postHome = require('./routes/post-home.js')

let upload = multer({ dest: 'user_images/' })
app.set('view engine', 'html')
app.engine('html', hbs.__express)
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname))
app.set('trust proxy', 1) // trust first proxy

// bcrypt.genSalt(10, (err, salt) => {
//   if (err) console.log(err)
//   app.use(session({ secret: salt, resave: true, saveUninitialized: true })) // If your application uses persistent login sessions, passport.session() middleware must also be used.
// })
let salt = bcrypt.genSaltSync(10)
app.use(session({ secret: salt, resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash()) // flash eh a mensagem padrao de erro ou sucesso de login do passport

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'user_images/')
  },
  filename: function (req, file, cb) {
    let extensao = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
    let nomeRandom = crypto.randomBytes(18).toString('hex')
    console.log('inter ' + JSON.stringify(file, undefined, 4))
    cb(null, nomeRandom + extensao)
  }
})
upload = multer({ storage })

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
              let user = docs
              console.log('aham ' + JSON.stringify(docs, undefined, 4))
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
  mongoClient.connect('mongodb://localhost:27017/User', { useNewUrlParser: true }, (err, client) => {
    if (err) console.log(`Não conseguiu se conectar ao servidor mongo: ${err}`)
    const db = client.db('User')
    db.collection('User').findOne({_id: new ObjectID(id)}).then((docs) => {
      let user = docs
      client.close()
      done(err, user)
    }).catch((err) => console.log(err))
  })
})

function logadoOuNao (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(403).redirect('/forbidden')
}

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/views/index.html'))
})

app.post('/home', upload.single('fileToUpload'), (req, res) => {
  postHome.inserting(req, res)
})

app.post('/', passport.authenticate('local', { failureRedirect: '/nada', failureFlash: true }), (req, res) => {
  res.redirect(`/user:${req.user.nome}`) // esse user.id tá vindo do done(null, user) do localStrategy
})

app.get('/user:usuario', logadoOuNao, (req, res) => {
  getUser.querying(req, res)
})

app.post('/user:usuario', logadoOuNao, (req, res) => {
  mongoClient.connect('mongodb://localhost:27017/User', { useNewUrlParser: true }, (err, client) => {
    if (err) console.log(`Não conseguiu se conectar ao servidor mongo: ${err}`)
    const db = client.db('User')
    console.log('vaiisaiasi')
    let usuario = req.params.usuario.substring(req.params.usuario.indexOf(':') + 1, req.params.usuario.length)
    db.collection('User').findOne({nome: usuario}).then((docs) => {
      db.collection('User').findOneAndUpdate({_id: new ObjectID(req.user._id)}, { $addToSet: { amigos_id: docs._id } }).then((docs2) => {
        console.log('foi update' + JSON.stringify(docs, undefined, 4))
        db.collection('User').findOneAndUpdate({_id: new ObjectID(docs._id)}, { $addToSet: { amigos_id: req.user._id } }).then((docs3) => {
          res.redirect('/user:' + usuario)
        }).catch((err) => console.log(err))
      })
    })
  })
})
// app.post('/accept', logadoOuNao, (req, res) => {
//   mongoClient.connect('mongodb://localhost:27017/User', { useNewUrlParser: true }, (err, client) => {
//     if (err) console.log(err)
//     const db = client.db('User')
//     db.collection('User').findOneAndUpdate({ _id: new ObjectID(req.user._id) }, {  })
//   })
// })

app.get('/search', (req, res) => {
  mongoClient.connect('mongodb://localhost:27017/User', { useNewUrlParser: true }, (err, client) => {
    if (err) console.log(`Não conseguiu se conectar ao servidor mongo: ${err}`)
    const db = client.db('User')
    console.log('req.body.data ' + util.inspect(req._parsedOriginalUrl.query))
    db.collection('User').find({nome: {$regex: '.*' + req._parsedOriginalUrl.query + '.*'}}).toArray().then((docs) => {
      console.log('retorna usuario' + JSON.stringify(docs, undefined, 4))
      res.status(200).json(docs)
    }).catch((err) => console.log(err))
  })
})

app.post('/newPost', (req, res) => {
  mongoClient.connect('mongodb://localhost:27017/User', { useNewUrlParser: true }, (err, client) => {
    console.log('entrou')
    if (err) console.log(`Não conseguiu se conectar ao servidor mongo: ${err}`)
    const db = client.db('User')
    db.collection('User').findOneAndUpdate({_id: new ObjectID(req.user._id)}, {$push: { posts: req.body.post }}).then((doc) => res.status(200).redirect('/user:' + req.user.nome)).catch((err) => console.log(err))
  })
})

// app.post('/edit-post', (req, res) => {
//   mongoClient.connect('mongodb://localhost:27017/User', { useNewUrlParser: true }, (err, client) => {
//     if (err) console.log(`Não conseguiu se conectar ao servidor mongo: ${err}`)
//     const db = client.db('User')
//     // db.collection('User').insertOne({_id: new ObjectID(req.user._id)}, )
//   }).catch((err) => console.log(err))
// })

app.get('/config:id', logadoOuNao, (req, res) => {
  res.status(200).send('foi')
})

app.listen(3001)
