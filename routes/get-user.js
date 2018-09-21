const mongoClient = require('mongodb').MongoClient
const path = require('path')

exports.querying = (req, res) => {
  mongoClient.connect('mongodb://localhost:27017/User', { useNewUrlParser: true }, (err, client) => {
    if (err) console.log(`Não conseguiu se conectar ao servidor mongo: ${err}`)
    const db = client.db('User')
    let usuario = req.params.usuario.substring(req.params.usuario.indexOf(':') + 1, req.params.usuario.length)
    console.log('aqui:::' + JSON.stringify(req.params, undefined, 4))
    console.log('aqui:::' + req.params.usuario)
    db.collection('User').findOne({nome: usuario}).then((docs) => {
      if (docs !== null) {
        db.collection('User').find({ amigos_id: {'$in': [docs._id]} }, { _id: { '$in': docs.amigos_id } }).toArray().then((docs2) => {
          docs.amigos = []
          if (docs2.length > 0) {
            for (let i = 0; i < docs2.length; i++) {
              docs.amigos[i] = { _id: docs2[i]._id, nome: docs2[i].nome, imagem: docs2[i].imagem }
            }
            console.log('retorna usuario doc2' + JSON.stringify(docs2, undefined, 4))
          }
          console.log('req.user._id' + typeof req.user._id)
          console.log('docs._id' + docs._id)
          docs.usuarioLogado = req.user
          if (String(req.user._id) === String(docs._id)) {
            db.collection('User').find({ $and: [ { amigos_id: {'$in': [docs._id]} }, { _id: { '$not': { '$in': docs.amigos_id } } } ] }).toArray().then((docs3) => {
              console.log('self')
              docs.amigosPendentes = []
              if (docs3.length > 0) {
                for (let i = 0; i < docs3.length; i++) {
                  docs.amigosPendentes[i] = { _id: docs3[i]._id, nome: docs3[i].nome, imagem: docs3[i].imagem }
                }
              }
              console.log('retorna usuario doc3' + JSON.stringify(docs, undefined, 4))
              docs = JSON.stringify(docs)
              docs = encodeURI(docs)
              res.status(200).render(path.join(__dirname, '../views/home.hbs'), { 'usuario': docs })
            }).catch((err) => console.log(err))
          } else {
            console.log('not-self')
            if (String(req.user.amigos_id).indexOf(String(docs._id)) === -1 && String(docs.amigos_id).indexOf(String(req.user._id)) === -1) {
              console.log('docs.amigos_id ' + typeof String(docs.amigos_id[1]))
              console.log('req.user.amigos_id ' + req.user.amigos_id)
              console.log('docs.amigos_id.indexOf(req.user._id) ' + docs.amigos_id.indexOf(req.user._id))
              docs.adicionar = '<form id="postFriend" method="post" style="margin: auto"><button type="submit" form="postFriend" class="btn" id="botaoImagem" style="height: 50px; width:200px; background-color: rgb(250,200,200) !important;">Adicionar contato</button></form>'
            }
            docs = JSON.stringify(docs)
            docs = encodeURI(docs)
            res.status(200).render(path.join(__dirname, '../views/user.hbs'), { 'usuario': docs })
          }
        }).catch((err) => console.log(err))
      }
    }).catch((err) => console.log(err))
  })
}
