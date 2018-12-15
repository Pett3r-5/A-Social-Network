
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users-controller');
const auth = require('../services/auth.js');


router.get('/:id', auth.logadoOuNao, usersController.get);
router.put('/:id', auth.logadoOuNao, usersController.put);

module.exports = router;
