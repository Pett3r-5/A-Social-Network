const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const schema = new Schema({
    nome: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    imagem: {
      type: String,
      required: true
    },
    amigos_id: [
      {
        type: ObjectId,
        unique: true
      }
    ],
    posts: [
      {
        type: String
      }
    ]
})

module.exports = mongoose.model('User', schema)
