const express = require("express");
const router = express.Router();
const {
  controllerGetRole,
  controllerGetRoleById,
  controllerAddRole,
  controllerUpdateRole,
  controllerDeleteRole,
} = require("./role.controller");
const AuthAdmin = require("./../../middleware/AuthAdmin");

router.get("/", AuthAdmin, controllerGetRole);
router.get("/:id", AuthAdmin, controllerGetRoleById);
router.post("/", AuthAdmin, controllerAddRole);
router.put("/:id", AuthAdmin, controllerUpdateRole);
router.delete("/:id", AuthAdmin, controllerDeleteRole);

module.exports = router;
