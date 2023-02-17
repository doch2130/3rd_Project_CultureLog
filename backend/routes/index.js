const express = require('express');
const controller = require('../controller/Clogdata');
const router = express.Router();

router.get('/movieAPI', controller.Naver);
router.get('/bookAPI', controller.Aladin);
router.get('/performanceAPI', controller.Kopis);

module.exports = router;
