const express = require("express");
const router = express.Router();

const {
  controllerGetTransaksi,
  controllerGetTransaksiById,
  controllerAddTransaksi,
  controllerDeleteTransaksi,
} = require("./transaksi.controller.js");
const AuthAdmin = require("./../../middleware/AuthAdmin");

router.get("/", AuthAdmin, controllerGetTransaksi);
router.get("/:id", AuthAdmin, controllerGetTransaksiById);
router.post("/", AuthAdmin, controllerAddTransaksi);
router.delete("/:id", AuthAdmin, controllerDeleteTransaksi);

module.exports = router;
