const express = require("express");
const router = express.Router();
const {
  controllerGetAdmin,
  controllerGetAdminById,
  controllerAddAdmin,
  controllerUpdateAdmin,
  controllerDeleteAdmin,
  controllerLoginAdmin,
} = require("./admin.controller");

const AuthAdmin = require("./../../middleware/AuthAdmin");

router.get("/", AuthAdmin, controllerGetAdmin);
router.get("/:id", AuthAdmin, controllerGetAdminById);
router.post("/", AuthAdmin, controllerAddAdmin);
router.put("/:id", AuthAdmin, controllerUpdateAdmin);
router.delete("/:id", AuthAdmin, controllerDeleteAdmin);
router.post("/login", controllerLoginAdmin);

module.exports = router;
