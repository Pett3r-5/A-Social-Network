const actionsRepo = require('../repositories/actions-repository')

exports.getSearch = ('/search', async(req, res) => {
  let docs
  try {
    docs = await actionsRepo.get({nome: {$regex: '.*' + req._parsedOriginalUrl.query + '.*'}})
  } catch(error) {
    console.log(error)
    return res.status(500).send(error)
  }
  return res.status(200).json(docs)
})
