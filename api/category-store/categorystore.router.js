const express = require('express');
const router = express.Router()
const {
    controllerGetCategoryStore,
    controllerGetCategoryStoreById,
    controllerAddCategoryStore,
    controllerUpdateCategoryStore,
    controllerDeleteCategoryStore
} = require('./categorystore.controller')


router.get('/', controllerGetCategoryStore)
router.get('/:id', controllerGetCategoryStoreById)
router.post('/', controllerAddCategoryStore)
router.put('/:id', controllerUpdateCategoryStore)
router.delete('/:id', controllerDeleteCategoryStore)

module.exports = router
