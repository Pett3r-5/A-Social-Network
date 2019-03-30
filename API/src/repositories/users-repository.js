const User = require('../models/user')

exports.getUser = (query) => {
  return User.findOne(query).lean()
}

exports.getFriends = (query) => {
  return  User.find(query).lean()
}

exports.getPendingFriendships = (query, user) => {  //delating processing/query manipulation to the database
  return User.find(query)
  .stream()
  .on('data', (data)=> {
    user.amigosPendentes.push({ _id: data._id, nome: data.nome, imagem: data.imagem })
  })
  .on('error', (error)=>{
    console.log(`getPendingFriendships: ${error}`)
    return error
  }).toArray()
}
