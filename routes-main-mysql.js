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

const LocalStrategy = require('passport-local').Strategy

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname))
app.set('trust proxy', 1) // trust first proxy
app.use(passport.initialize())
bcrypt.genSalt(10, (err, salt) => {
  if (err) console.log(err)
  app.use(session({ secret: salt, resave: true, saveUninitialized: true })) // If your application uses persistent login sessions, passport.session() middleware must also be used.
})
app.use(flash()) // flash eh a mensagem padrao de erro ou sucesso de login do passport

let user = {nome: '', id: '', imagem: '', authToken: ''}

passport.use(new LocalStrategy( // o filtro de buscar o usuario no banco de dados.
  function (username, password, done) {
    let createCon = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'spot',
      database: 'first'
    })
    createCon.query('SELECT * FROM first.User WHERE nome = ?', [username], (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(result[0])
      if (result.length !== 0) {
        bcrypt.compare(password, result[0].password, (err, resul) => {
          if (err) {
            console.log(err)
          }
          if (resul === false) {
            createCon.end()
            console.log('false')
            return done(null, false)
          } else {
            console.log('true')
            user = result[0]
            createCon.end()
            return done(null, user)
          }
        })
      } else {
        createCon.end()
        console.log('veio aqui tambem')
        return done(null, false)
      }
    })
  }
))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  let createCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'spot',
    database: 'first'
  })
  createCon.query('SELECT * FROM first.id WHERE first.id = ?', [id], (err, result) => {
    if (err) {
      console.log(err)
    }
    createCon.end()
    user = result[0]
    done(err, user)
  })
})

app.post('/', passport.authenticate('local', { failureRedirect: '/nada', failureFlash: true }), (req, res) => {
  user.nome = req.user.nome
  user.id = req.user.id
  user.authToken = req.user.auth_token
  user.imagem = req.user.imagem
  let form = formidable.IncomingForm()
  form.uploadDir = './images'
  form.keepExtensions = true
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err)
    }
    console.log('fields: ' + fields)
    console.log('files: ' + files)
  })
  res.redirect(`/home:${req.user.auth_token}`) // esse user.id tá vindo do done(null, user) do localStrategy
}) // aqui passport.authenticate eh um middleware, entao depois ainda pode ter o (req,res) => {}

app.get('/home:id', (req, res) => {
  let nome = {nome: user.nome}
  console.log(nome)
  res.render(path.join(__dirname, '/views/home.hbs'), nome)
}) // aqui passport eh um middleware, entao depois ainda pode ter o (req,res) =>

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.get('/config:id', passport.authenticate('local', { successRedirect: `/config:${user.authToken}`, failureRedirect: '/nada', failureFlash: true }), (req, res) => {
  res.send('foi')
})

app.post('/home', (req, res) => {
  let createCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'spot',
    database: 'first'
  })
  console.log('entrou')
  console.log('body: ' + JSON.stringify(req.body, undefined, 4))
  // console.log('userCadastro: ' + JSON.parse(req, undefined, 4))
  if (req.body.user_cadastro) {
    let cadastro = {user: req.body.user_cadastro, email: req.body.email_cadastro, password: req.body.senha_cadastro, auth_token: req.body.user_cadastro}
    // if (!validator.isEmail(cadastro.email_cadastro)) {
    //   res.send('email invalido')
    // }
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
    createCon.query('SELECT auth_token FROM first.User WHERE auth_token = ?', [cadastro.auth_token], (err, result) => {
      if (err) {
        console.log(err)
      }
      if (result.length === 0) {
        createCon.query('INSERT INTO User(nome,email,password,auth_token, imagem) VALUES (?,?,?,?) ', [cadastro.user, cadastro.email, cadastro.password, cadastro.auth_token, cadastro.imagem], (err, result) => {
          if (err) {
            console.log(err)
          }
          createCon.end()
        })
      } else {
        res.send('usuario já cadastrado')
        createCon.end()
      }
    })
  }
})

app.listen(3001)
