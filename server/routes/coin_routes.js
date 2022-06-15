const express = require('express'); 
const router = express.Router(); 
const coin_controller = require('../controllers/coin_controller.js'); 

//routes
module.exports = router; 

router.get('/api', coin_controller.list_coins) 
