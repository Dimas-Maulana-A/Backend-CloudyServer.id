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

router.get("/",  controllerGetDetails);
router.get("/:id",  controllerGetDetailsById);
router.post("/",  controllerAddDetails);
router.put("/:id",  controllerUpdateDetails);
router.delete("/:id",  controllerDeleteDetails);

module.exports = router;
