const express = require('express')
const app = express()


const Blog = require('./blog.controller')
app.use('/', Blog )

module.exports = app
