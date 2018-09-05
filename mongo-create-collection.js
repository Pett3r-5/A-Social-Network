const mongoClient = require('mongodb').MongoClient
const bcrypt = require('bcryptjs')

mongoClient.connect('mongodb://localhost:2707/User', { useNewUrlParser: true }, (err, client) => {
  if (err) { console.log(err) }
  const db = client.db('User');
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log(err)
    }
    let password = '123456'
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.log(err)
      }
      password = hash
      db.collection('User').insertOne({nome: 'teste1', email: 'teste@gmail.com', password: password, auth_token: '', imagem: ''}).then((docs) => { console.log('ok' + docs);})
    })
  })
})
