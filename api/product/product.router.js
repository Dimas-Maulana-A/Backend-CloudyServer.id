const express = require('express')
const app = express()
const AuthAdmin = require("./../../middleware/AuthAdmin");


const Product = require('./product.controller')
app.use('/', AuthAdmin, Product )

module.exports = app