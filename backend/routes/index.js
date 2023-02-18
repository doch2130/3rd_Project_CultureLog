const express = require('express');
const controller = require('../controller/Clogdata');
const controller2 = require('../controller/Cdbregister');
const router = express.Router();

router.get('/movieAPI', controller.Naver);
router.get('/bookAPI', controller.Aladin);
router.get('/performanceAPI', controller.Kopis);

router.post('/performanceDB', controller2.PerfoDB);
router.post('/movieDB', controller2.MovieDB);
router.post('/bookDB', controller2.BookDB);

module.exports = router;
