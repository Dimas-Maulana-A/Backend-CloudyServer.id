const express = require('express');
const router = express.Router()
const {
    controllerGetCategoryBlog,
    controllerGetCategoryBlogById,
    controllerAddCategoryBlog,
    controllerUpdateCategoryBlog,
    controllerDeleteCategoryBlog
} = require('./categoryblog.controller')
const AuthAdmin = require("./../../middleware/AuthAdmin");

router.get('/',AuthAdmin, controllerGetCategoryBlog)
router.get('/:id', AuthAdmin, controllerGetCategoryBlogById)
router.post('/', AuthAdmin, controllerAddCategoryBlog)
router.put('/:id', AuthAdmin, controllerUpdateCategoryBlog)
router.delete('/:id', AuthAdmin, controllerDeleteCategoryBlog)

module.exports = router
