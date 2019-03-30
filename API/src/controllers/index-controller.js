const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const path = require('path')

exports.get = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
}


let amigosPendentesLoop = (user, amigosPendentes, i , callback)=> { //not blocking the event loop: recursion for big o of n iterations
  if(!user || !amigos) return callback('amigosPendentesLoop: user or amigos undefined')

  user.amigosPendentes[i] = { _id: amigosPendentes[i]._id, nome: amigosPendentes[i].nome, imagem: amigosPendentes[i].imagem }

  if (i === amigosPendentes.length - 1) {
    return callback()
  }
  setImmediate(amigosPendentesLoop.bind(null, user, amigosPendentes, i+1, callback))
}


let amigosLoop = (user, amigos, i, callback)=> { //not blocking the event loop: recursion for big o of n iterations
  if(!user || !amigos) return callback('amigosLoop: User or amigos undefined')

  user.amigos[i] = { _id: amigos[i]._id, nome: amigos[i].nome, imagem: amigos[i].imagem }

  if (i === amigos.length - 1) {
    return callback()
  }
  setImmediate(amigosLoop.bind(null, user, amigos, i+1, callback))
}




exports.postIndex = async (req, res) => {
  // let usuario = req.params.id.substring(req.params.id.indexOf(':') + 1, req.params.id.length)
  let usuario = req.body.username
  let user
  let amigos
  let amigosPendentes
  try {
    user = await User.findOne({nome: usuario}).lean()
  } catch(error) {
    console.log(error);
    return res.status(500).send(error)
  }
  if (!user) {
    res.status(500).send('nenhum registro de usuário encontrado')
  }
  amigos = await User.find({ amigos_id: {'$in': [user._id]} , _id: { '$in': user.amigos_id } }).lean()
  user.amigos = []

  amigosLoop(user, amigos, 0, async (err)=>{
    if(err) console.log(err)

    user.usuarioLogado = req.user

    if (String(req.user._id) !== String(user._id)) {
      return res.status(200).send(user)
    }

    try {
      amigosPendentes = await User.find({ $and: [ { amigos_id: {'$in': [user._id]} }, { _id: { '$not': { '$in': user.amigos_id } } } ] }).lean()
    } catch(error) {
      console.log(error);
      return res.status(500).send(error)
    }

    user.amigosPendentes = []

    amigosPendentesLoop(user, amigosPendentes, 0, (err)=>{
      if(err){
        console.log(err)
      }

      return res.status(200).send(user)
    })
  })
}

exports.postHome = async (req, res) => {
  if (req.body.user_cadastro) {
    let cadastro = {user: req.body.user_cadastro, email: req.body.email_cadastro, password: req.body.senha_cadastro, imagem: 'avatar.jpg'}
    if (req.file) {
      cadastro.imagem = req.file.filename
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err)
      }
      bcrypt.hash(cadastro.password, salt, async (err, hash) => {
        if (err) {
          console.log(err)
        }
        cadastro.password = hash
        let docs
        let docs2
        try {
          docs = await User.findOne({nome: cadastro.user})
          if (docs === null) {
            docs2 = await User.create({nome: cadastro.user, email: cadastro.email, password: cadastro.password, imagem: cadastro.imagem, amigos_id: [], posts: []})
            res.redirect(`/`)
          } else {
            res.send('usuario já cadastrado')
          }
        } catch(error) {
          console.log(error);
          res.status(500).send(error)
        }
      })
    })

  }
}


exports.config = (req, res) => {
  res.status(200).send('foi')
}
