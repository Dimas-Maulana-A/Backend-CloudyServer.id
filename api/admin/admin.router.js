const express = require('express');
const router = express.Router()
const {
    controllerGetAdmin,
    controllerGetAdminById,
    controllerAddAdmin,
    controllerUpdateAdmin,
    controllerDeleteAdmin,
    controllerLoginAdmin
} = require('./admin.controller')


router.get('/', controllerGetAdmin)
router.get('/:id', controllerGetAdminById)
router.post('/', controllerAddAdmin)
router.put('/:id', controllerUpdateAdmin)
router.delete('/:id', controllerDeleteAdmin)
router.post('/login', controllerLoginAdmin)

module.exports = router
