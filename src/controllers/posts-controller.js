
exports.postPost =  async (req, res) => {
  let docs
  try {
    docs = await User.findOneAndUpdate({_id: new ObjectID(req.user._id)}, {$push: { posts: req.body.post }})
  } catch(error) {
    console.log(error);
    return res.status(500).send(error)
  }
  return res.status(200).redirect('/user:' + req.user.nome)
}

exports.putPost = (req, res) => {
  return null
}

exports.deletePost = (req, res) => {
  return null
}

exports.postComment = (req, res) => {
  return null
}

exports.putComment = (req, res) => {
  return null
}

exports.deleteComment = (req, res) => {
  return null
}
