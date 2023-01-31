const models = require("../../models/index")
const transaksi = models.transaksi
const { uuid } = require('uuidv4');

module.exports = {
    controllerGetTransaksi: async(req, res)=> {
        await transaksi.findAll({
            attributes: ["id", "product_id", "client_id", "status", "admin_id", "total", "total_price"]
        })
    }   
}