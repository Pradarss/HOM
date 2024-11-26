const express = require('express');
const { shortenUrl, redirectUrl, getUrlStats } = require('./urlcontroller');

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/:shortId', redirectUrl);
router.get('/stats/:shortId', getUrlStats);

module.exports = router;
