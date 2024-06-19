const express  = require('express');
const {generateNewShortUrl,accesstheshortID , handleAnalytics} = require('../controllers.js/url')
const router = express.Router();

router.post('/' , generateNewShortUrl)
router.get('/:shortID' , accesstheshortID)
router.get('/analytics/:shortID' , handleAnalytics)


module.exports = router;