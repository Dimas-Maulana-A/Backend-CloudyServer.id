const express = require("express");
const router = express.Router();
const {
  controllerGetClient,
  controllerGetClientById,
  controllerAddClient,
  controllerUpdateClient,
  controllerDeleteClient,
  controllerLoginClient,
} = require("./client.controller");
const AuthAdmin = require("./../../middleware/AuthAdmin");

router.post("/login", controllerLoginClient);
router.get("/", AuthAdmin, controllerGetClient);
router.get("/:id", AuthAdmin, controllerGetClientById);
router.post("/", AuthAdmin, controllerAddClient);
router.put("/:id", AuthAdmin, controllerUpdateClient);
router.delete("/:id", AuthAdmin, controllerDeleteClient);

module.exports = router;
