const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const path = require('path')

exports.get = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
}

exports.postIndex = (req, res) => {
  res.redirect(`/users/user:${req.user.nome}`) // esse user.id tá vindo do done(null, user) do localStrategy
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
            docs2 = await User.insertOne({nome: cadastro.user, email: cadastro.email, password: cadastro.password, imagem: cadastro.imagem, amigos_id: [], posts: []})
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
