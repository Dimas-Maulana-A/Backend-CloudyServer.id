const express = require('express')
const app = express()

const AuthAdmin = require("./../../middleware/AuthAdmin");

const Blog = require('./blog.controller')
app.use('/', AuthAdmin, Blog )

module.exports = app