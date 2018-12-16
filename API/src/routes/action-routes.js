const express = require('express');
const router = express.Router();

const actionsController = require('../controllers/actions-controller');

router.get('/search', actionsController.getSearch);

module.exports = router;
