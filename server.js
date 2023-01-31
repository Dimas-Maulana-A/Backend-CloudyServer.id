const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

app.use(express())
app.use(bodyParser.json())
app.use(cors())

const Router = require('./api/router.js')
app.use('/api', Router)

app.listen(8080, ()=> console.log('server run at port 8080'))