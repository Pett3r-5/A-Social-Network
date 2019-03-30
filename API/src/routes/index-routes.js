const express = require('express');
const router = express.Router();
const passport = require('passport')
const multer = require('multer')

const indexController = require('../controllers/index-controller');
const auth = require('../services/auth');
const fileUpload = require('../services/file-upload.js')

let upload = multer({ dest: '/images/user_images/' })
let storage = fileUpload.storage
upload = multer({ storage })

router.get('/', indexController.get);
// router.post('/', passport.authenticate('local', { failureRedirect: '/nada', failureFlash: true }) ,indexController.postIndex);
router.post('/', auth.inicialLogadoOuNao , indexController.postIndex);
router.post('/home', upload.single('fileToUpload'), indexController.postHome);
router.post('/config:id', auth.logadoOuNao, indexController.config);


module.exports = router;
