const express = require('express')
const {handleUserSignup,handleUserLogin} = require('../controllers.js/user')
const router  = express.Router();


router.post("/" , handleUserSignup)
router.post('/login' , handleUserLogin)

module.exports = router;