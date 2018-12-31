const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const path = require('path')

exports.get = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
}

exports.postIndex = async (req, res) => {
  // let usuario = req.params.id.substring(req.params.id.indexOf(':') + 1, req.params.id.length)
  let usuario = req.body.username
  let user
  let amigos
  let amigosPendentes
  try {
    user = await User.findOne({nome: usuario}).lean()
    if (user !== null) {
      amigos = await User.find({ amigos_id: {'$in': [user._id]} , _id: { '$in': user.amigos_id } }).lean()
      user.amigos = []
      if (amigos.length > 0) {
        for (let i = 0; i < amigos.length; i++) {
          user.amigos[i] = { _id: amigos[i]._id, nome: amigos[i].nome, imagem: amigos[i].imagem }
        }
      }
      user.usuarioLogado = req.user
      if (String(req.user._id) === String(user._id)) {
        amigosPendentes = await User.find({ $and: [ { amigos_id: {'$in': [user._id]} }, { _id: { '$not': { '$in': user.amigos_id } } } ] }).lean()
        // console.log('self')
        user.amigosPendentes = []
        if (amigosPendentes.length > 0) {
          for (let i = 0; i < amigosPendentes.length; i++) {
            user.amigosPendentes[i] = { _id: amigosPendentes[i]._id, nome: amigosPendentes[i].nome, imagem: amigosPendentes[i].imagem }
          }
        }
        // user = JSON.stringify(user)
        // user = encodeURI(user)
        // return res.status(200).render(path.join(__dirname, '../views/home.hbs'), { 'usuario': user })
        return res.status(200).send(user)
      } else {
        // console.log('not-self')
        // if (String(req.user.amigos_id).indexOf(String(user._id)) === -1 && String(user.amigos_id).indexOf(String(req.user._id)) === -1) {
        //   user.adicionar = '<form id="postFriend" method="post" style="margin: auto"><button type="submit" form="postFriend" class="btn" id="botaoImagem" style="height: 50px; width:200px; background-color: rgb(250,200,200) !important;">Adicionar contato</button></form>'
        // }
        // user = JSON.stringify(user)
        // user = encodeURI(user)
        // return res.status(200).render(path.join(__dirname, '../views/user.hbs'), { 'usuario': user })
        return res.status(200).send(user)
      }
    } else {
      res.status(500).send('nenhum registro de usuário encontrado')
    }
  } catch(error) {
    console.log(error);
    return res.status(500).send(error)
  }
  // res.redirect(__dirname + `/users/user:${req.user.nome}`) // esse user.id tá vindo do done(null, user) do localStrategy
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
