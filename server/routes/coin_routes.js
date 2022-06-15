const express = require('express'); 
const router = express.Router(); 
const coins_controller = require('../controllers/coins_controller.js'); 

module.exports = router; 

router.get('/api', coins_controller.list_coins)
