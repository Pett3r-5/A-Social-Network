const express = require('express');
const User = require('../models/user')
const path = require('path')

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
