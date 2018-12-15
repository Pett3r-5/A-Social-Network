const User = require('../models/user')

exports.getSearch = ('/search', async(req, res) => {
  let docs
  try {
    docs = await User.find({nome: {$regex: '.*' + req._parsedOriginalUrl.query + '.*'}}).toArray()
  } catch(error) {
    console.log(error)
    return res.status(500).send(error)
  }
  return res.status(200).json(docs)
})
