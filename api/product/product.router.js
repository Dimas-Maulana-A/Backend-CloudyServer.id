const express = require('express')
const app = express()

const Product = require('./product.controller')
app.use('/', Product )

module.exports = app