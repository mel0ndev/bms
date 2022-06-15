const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config(); 

const app = express(); 
const port = 5000;

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const routes = require('./server/routes/coin_routes.js'); 

app.listen(port, () => console.log(`Listening on port: ${port}!`)); 
