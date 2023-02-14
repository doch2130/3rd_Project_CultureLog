const express = require('express');
const controller = require('../controller/Clog');
const router = express.Router();

router.get('/movieAPI', controller.Naver);

module.exports = router;
