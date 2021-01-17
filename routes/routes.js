const express = require('express');
const router = express.Router();
const user = require('../controllers/controllers');

router.get('/demo', user.getList);
module.exports = router;

