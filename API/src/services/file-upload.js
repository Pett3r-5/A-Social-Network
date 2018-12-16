const multer = require('multer')
const crypto = require('crypto')


exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'user_images/')
  },
  filename: function (req, file, cb) {
    let extensao = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
    let nomeRandom = crypto.randomBytes(18).toString('hex')
    cb(null, nomeRandom + extensao)
  }
})
