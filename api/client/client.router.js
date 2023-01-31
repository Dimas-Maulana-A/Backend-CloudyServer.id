const express = require('express');
const router = express.Router();
const {
    controllerGetClient,
    controllerGetClientById,
    controllerAddClient,
    controllerUpdateClient,
    controllerDeleteClient,
    controllerLoginClient
} = require('./client.controller');

router.post('/login', controllerLoginClient)
router.get('/', controllerGetClient)
router.get('/:id', controllerGetClientById)
router.post('/', controllerAddClient)
router.put('/:id', controllerUpdateClient)
router.delete('/:id', controllerDeleteClient)


module.exports = router