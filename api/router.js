const express = require('express')
const app = express()

// Cloudyserver.id
const Role = require('./roles/role.router')
app.use('/role', Role)

const Admin = require('./admin/admin.router')
app.use('/admin', Admin)

// Blog.cloudyserver.id
const CategoryBlog = require('./category-blog/categoryblog.router')
app.use('/categoryblog', CategoryBlog)

const Blog = require('./blog/blog.router')
app.use('/blog', Blog)

// Store.cloudyserver.id
const CategoryStore = require('./category-store/categorystore.router')
app.use('/categorystore', CategoryStore)

const Client = require('./client/client.router')
app.use('/client', Client)

const Product = require('./product/product.router')
app.use('/product', Product)

const Transaksi = require('./transaksi/transaksi.router')
app.use('/transaksi', Transaksi)

const Details = require('./details_transaksi/details.router')
app.use('/details', Details)

module.exports = app