const multer = require('multer')
const crypto = require('crypto')


exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('req-----------------');
    console.log(req);
    console.log('file--------------');
    console.log(file);
    cb(null, __dirname + '/../images/user_images/')
  },
  filename: function (req, file, cb) {
    let extensao = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
    let nomeRandom = crypto.randomBytes(18).toString('hex')
    cb(null, nomeRandom + extensao)
  }
})
