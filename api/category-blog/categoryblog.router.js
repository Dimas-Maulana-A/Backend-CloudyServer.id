const express = require('express');
const router = express.Router()
const {
    controllerGetCategoryBlog,
    controllerGetCategoryBlogById,
    controllerAddCategoryBlog,
    controllerUpdateCategoryBlog,
    controllerDeleteCategoryBlog
} = require('./categoryblog.controller')


router.get('/', controllerGetCategoryBlog)
router.get('/:id', controllerGetCategoryBlogById)
router.post('/', controllerAddCategoryBlog)
router.put('/:id', controllerUpdateCategoryBlog)
router.delete('/:id', controllerDeleteCategoryBlog)

module.exports = router
