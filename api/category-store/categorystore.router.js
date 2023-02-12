const express = require("express");
const router = express.Router();
const {
  controllerGetCategoryStore,
  controllerGetCategoryStoreById,
  controllerAddCategoryStore,
  controllerUpdateCategoryStore,
  controllerDeleteCategoryStore,
} = require("./categorystore.controller");
const AuthAdmin = require("./../../middleware/AuthAdmin");

router.get("/", controllerGetCategoryStore);
router.get("/:id", AuthAdmin, controllerGetCategoryStoreById);
router.post("/", AuthAdmin, controllerAddCategoryStore);
router.put("/:id", AuthAdmin, controllerUpdateCategoryStore);
router.delete("/:id", AuthAdmin, controllerDeleteCategoryStore);

module.exports = router;
