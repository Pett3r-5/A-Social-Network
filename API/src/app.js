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

const mongoose = require('mongoose')
let ObjectID = require('mongodb').ObjectID
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const util = require('util')

const indexRoutes = require('./routes/index-routes')
const userRoutes = require('./routes/user-routes')
const postRoutes = require('./routes/post-routes')
const actionRoutes = require('./routes/action-routes')

app.set('view engine', 'html')
app.engine('html', hbs.__express)
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname))
app.set('trust proxy', 1) // trust first proxy


//usar helmet


app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


const mongoClient = require('mongodb').MongoClient
mongoose.connect('mongodb://localhost:27017/User');
const User = require('./models/user')
// bcrypt.genSalt(10, (err, salt) => {
//   if (err) console.log(err)
//   app.use(session({ secret: salt, resave: true, saveUninitialized: true })) // If your application uses persistent login sessions, passport.session() middleware must also be used.
// })
let salt = bcrypt.genSaltSync(10)
app.use(session({ secret: salt, resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash()) // flash eh a mensagem padrao de erro ou sucesso de login do passport

passport.use(new LocalStrategy( // o filtro de buscar o usuario no banco de dados.
  function (username, password, done) {
    mongoClient.connect('mongodb://localhost:27017/User', { useNewUrlParser: true }, (err, client) => {
      if (err) console.log(`Não conseguiu se conectar ao servidor mongo: ${err}`)
      const db = client.db('User')
      console.log(username);
      db.collection('User').findOne({nome: username}).then((docs) => {
        if (docs === null) {
          console.log('usuario nao achado: ' + err)
          client.close()
          return done(null, false)
        } else {
          bcrypt.compare(password, docs.password, (err, resul) => {
            if (err) {
              console.log(err)
            }
            if (resul === false) {
              client.close()
              return done(null, false)
            } else {
              console.log('entrou');
              let user = docs
              client.close()
              return done(null, user)
            }
          })
        }
      }, (err) => {
        console.log('usuario nao achado: ' + err)
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

app.use('/', indexRoutes)
app.use('/users/', userRoutes)
app.use('/actions/', actionRoutes)
app.use('/posts/', postRoutes)


app.listen(3001)

module.exports = app;
