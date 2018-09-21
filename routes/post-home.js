const mongoClient = require('mongodb').MongoClient
const bcrypt = require('bcryptjs')

exports.inserting = (req, res) => {
  console.log('body: ' + JSON.stringify(req.body, undefined, 4))
  // console.log('userCadastro: ' + JSON.parse(req, undefined, 4))
  if (req.body.user_cadastro) {
    let cadastro = {user: req.body.user_cadastro, email: req.body.email_cadastro, password: req.body.senha_cadastro, auth_token: req.body.user_cadastro, imagem: 'avatar.jpg'}
    if (req.file) {
      console.log('VAII ' + req.file.filename)
      cadastro.imagem = req.file.filename
      console.log('req.file.fileName ' + JSON.stringify(req.file, undefined, 4))
    }
    // if (!validator.isEmail(cadastro.email_cadastro)) {
    //   res.send('email invalido')
    // }
    console.log('cadastro.imagem fora ' + cadastro.imagem)
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err)
      }
      bcrypt.hash(cadastro.password, salt, (err, hash) => {
        if (err) {
          console.log(err)
        }
        cadastro.password = hash
      })
      bcrypt.hash(cadastro.auth_token, salt, (err, hash) => {
        if (err) {
          console.log(err)
        }
        cadastro.auth_token = hash
      })
    })
    // cadastro.auth_token = jwt.sign(cadastro.user, 'galinha').toString()
    mongoClient.connect('mongodb://localhost:27017/User', { useNewUrlParser: true }, (err, client) => {
      if (err) console.log(`Não conseguiu se conectar ao servidor mongo: ${err}`)
      const db = client.db('User')
      db.collection('User').findOne({nome: cadastro.user}).then((docs) => {
        console.log('docos: ' + docs)
        if (docs === null) {
          db.collection('User').insertOne({nome: cadastro.user, email: cadastro.email, password: cadastro.password, auth_token: cadastro.auth_token, imagem: cadastro.imagem, amigos_id: [], posts: []}).then((docs) => {
            console.log('entrou ' + docs)
            client.close()
            res.redirect(`/`)
          }, (err) => console.log('unable', err))
        } else {
          res.send('usuario já cadastrado')
          client.close()
        }
      }).catch((err) => console.log(err))
    })
  }
}
