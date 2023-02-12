const models = require("../../models/index")
const transaksi = models.transaksi
const { v4: uuidv4 } = require('uuid');

module.exports = {
    controllerGetTransaksi: async(req, res)=> {
        await transaksi.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: [
                {
                    model: models.admin,
                    as: "admins",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [{
                        model: models.role,
                        as: "roles",
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }]
                },
                {
                    model: models.client,
                    as: "clients",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: models.detail_transaksi,
                    as: "details",
                    attributes: {
                        exclude: ['updatedAt']
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
                }
            ]
        })
        .then(result=> {
            res.json({
                data:result
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },

    controllerGetTransaksiById: async(req, res)=> {
        await transaksi.findOne({
            where: {id: req.params.id},
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: [
                {
                    model: models.admin,
                    as: "admins",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [{
                        model: models.role,
                        as: "roles",
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }]
                },
                {
                    model: models.client,
                    as: "clients",
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: models.detail_transaksi,
                    as: "details",
                    attributes: {
                        exclude: ['updatedAt']
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
                }
            ]
        })
        .then(result=> {
            res.json({
                data:result
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    
    controllerAddTransaksi: async(req, res)=> {
        let id = uuidv4()
        let data = {
            id: id,
            client_id: req.body.client_id,
            status: "on process",
            admin_id: req.body.admin_id,
            metode_pembayaran: req.body.metode_pembayaran
        }
        transaksi.create(data)
        .then(async result=> {
            const getHarga = await models.product.findOne({
                where: {
                    id: req.body.product_id
                }
            })
            let datas = {
                transaksi_id : result.id,
                product_id: req.body.product_id,
                total_barang: req.body.total_barang,
                total_price: req.body.total_barang * getHarga.price
            }
            await models.detail_transaksi.create(datas)
            .then(results=> {
                res.json({
                    data: data, datas
                })
            })
            .catch(err=> {
                console.log(err)
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },

    controllerDeleteTransaksi: async(req,res)=> {
        await models.detail_transaksi.destroy({
            where: {
                transaksi_id: req.params.id
            }
        })
        .then(async result=> {
            await transaksi.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(results=> {
                res.json({
                    message: "data was successfully deleted"
                })
            })
            .catch(err=> {
                console.log(err)
            })
        })
        .catch(err=> {
            console.log(err)
        })
    }
}