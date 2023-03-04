const express = require("express");
const router = express.Router();

const {
  controllerGetDetails,
  controllerGetDetailsById,
  controllerAddDetails,
  controllerUpdateDetails,
  controllerDeleteDetails,
} = require("./details.controller.js");
const AuthAdmin = require("./../../middleware/AuthAdmin");

router.get("/", AuthAdmin, controllerGetDetails);
router.get("/:id", AuthAdmin, controllerGetDetailsById);
router.post("/", AuthAdmin, controllerAddDetails);
router.put("/:id", AuthAdmin, controllerUpdateDetails);
router.delete("/:id", AuthAdmin, controllerDeleteDetails);

module.exports = router;
