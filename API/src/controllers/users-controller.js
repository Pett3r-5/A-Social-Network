const express = require('express');
const User = require('../models/user')
const path = require('path')

exports.get = async (req, res) => {
  let usuario = req.params.id.substring(req.params.id.indexOf(':') + 1, req.params.id.length)
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
        user = JSON.stringify(user)
        user = encodeURI(user)
        return res.status(200).render(path.join(__dirname, '../views/home.hbs'), { 'usuario': user })
      } else {
        // console.log('not-self')
        if (String(req.user.amigos_id).indexOf(String(user._id)) === -1 && String(user.amigos_id).indexOf(String(req.user._id)) === -1) {
          user.adicionar = '<form id="postFriend" method="post" style="margin: auto"><button type="submit" form="postFriend" class="btn" id="botaoImagem" style="height: 50px; width:200px; background-color: rgb(250,200,200) !important;">Adicionar contato</button></form>'
        }
        user = JSON.stringify(user)
        user = encodeURI(user)
        return res.status(200).render(path.join(__dirname, '../views/user.hbs'), { 'usuario': user })
      }
    } else {
      res.status(500).send('nenhum registro de usuário encontrado')
    }
  } catch(error) {
    console.log(error);
    return res.status(500).send(error)
  }
}

exports.put = async (req, res) => {
  let usuario = req.params.usuario.substring(req.params.usuario.indexOf(':') + 1, req.params.usuario.length)
  let user
  let addAmigo
  let doc3
  try {
    user = await User.findOne({nome: usuario})
    addAmigo = await User.findOneAndUpdate({_id: new ObjectID(req.user._id)}, { $addToSet: { amigos_id: user._id } })
    doc3 = await User.findOneAndUpdate({_id: new ObjectID(user._id)}, { $addToSet: { amigos_id: req.user._id } })
  } catch (error) {
    console.log(error);
    return res.send(error)
  }
  return res.redirect('/users/user:' + usuario)
}
