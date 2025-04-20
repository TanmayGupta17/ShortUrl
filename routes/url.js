const express = require('express');
const router = express.Router();
const {GenerateShortUrl,handleGetAnalytics} = require('../controller/url');

router.post('/',GenerateShortUrl);
router.get('/analytics/:shortId',handleGetAnalytics);

module.exports = router;