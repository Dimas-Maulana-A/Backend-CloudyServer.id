const models = require("../../models/index")
const details = models.detail_transaksi

module.exports = {
    controllerGetDetails: async(req,res)=> {
        await details.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: [{
                model: models.product,
                as: "products",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: [
                    {
                    model: models.category_store,
                    as: "product_category",
                    attributes: ["name"],
                    }
                ],
            }]
        })
        .then(result=> {
            res.json({
                data : result
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerGetDetailsById: async(req,res)=> {
        await details.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: [{
                model: models.product,
                as: "products",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: [
                    {
                    model: models.category_store,
                    as: "product_category",
                    attributes: ["name"],
                    }
                ],
            }]
        })
        .then(result=> {
            res.json({
                data : result
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerAddDetails: async(req, res)=> {
        const {
            transaksi_id,
            product_id,
            total_barang
        } = req.body

        const prices = await models.product.findOne({
            where: {
                id: product_id
            }
        })

        const data = {
            transaksi_id: transaksi_id,
            product_id: product_id,
            total_barang: total_barang,
            total_price: prices.price * total_barang
        }

        await details.create(data)
        .then(result=> {
            res.json({
                data: data
            })
        })
        .catch(err=> {
            console.log(err)
        })

    },
    controllerUpdateDetails: async(req, res)=> {
        const {
            transaksi_id,
            product_id,
            total_barang
        } = req.body

        const prices = await models.product.findOne({
            where: {
                id: product_id
            }
        })

        const data = {
            transaksi_id: transaksi_id,
            product_id: product_id,
            total_barang: total_barang,
            total_price: prices.price * total_barang
        }

        await details.update(data, {
            where: {id: req.params.id}
        })
        .then(result=> {
            res.json({
                data: data
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerDeleteDetails: async(req, res)=> {
        await details.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result=> {
            res.json({
                message: "data was deleted successfully"
            })
        })
        .catch(err=> {
            console.log(err)
        })
    } 
}