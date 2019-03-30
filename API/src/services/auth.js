const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const usersRepo = require('../repositories/users-repository')
require('dotenv').config();

exports.inicialLogadoOuNao = async (req, res, next) => {
  console.log('1')
  return LoginAuth(req.body.username, req.body.password, (err, token)=> {
    if(err) {
      console.log(err)
      return res.status(403).send(`Unauthorized: ${err}`)
    }
    console.log('10')
    req.token = token;
    return next()
  })
  console.log('nunca')
}


LoginAuth = async (username, password, callbackFinal) => {
  console.log('2')
  let getUser
  try {
    getUser = await usersRepo.getUser({nome: username})
  } catch(error) {
    console.log(error)
    return callbackFinal(`User not found: ${error}`)
  }
  console.log('3')
  if(!getUser) {
    return callbackFinal("User not found")
  }

  return passwordCheck(password, getUser, (error, result)=> {
    if(error) {
      throw error
    }
    console.log('6');
    if (!result) {
      return callbackFinal("Wrong password")
    }

    return loginJWT(username, (error, token)=> {
      if(error) {
        return callbackFinal(error)
      }
      console.log('9');
      return callbackFinal(null, token)
    })
  })
}

passwordCheck = (password, docs, callback) => {
  console.log('4')
  return bcrypt.compare(password, docs.password, (err, result) => {
    if (err) {
      console.log(err)
      return callback(err)
    }

    console.log('5');
    return callback(null, result)
  })
}

loginJWT = (username, callback) => {
  console.log('7');
  return jwt.sign({user: username}, process.env.SALT, { expiresIn: '3h' }, (error, token)=> {
    if(error) {
      console.log(error)
      return callback(error)
    }
    console.log('8');
    return callback(null, token)
  })
}

exports.logadoOuNaoToken = (req, res, next) => {
  jwt.verify(req.body.token, process.env.SALT, (err, decoded)=>{
    if(err){
      return res.status(401).send('unauthorized token')
    }
    return next()
  })
}


exports.logadoOuNao = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(403).redirect('/forbidden')
}

exports.logadoOuNaoDeprecated = (req, res, next) => { //usado para express-sessions
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(403).redirect('/forbidden')
}
