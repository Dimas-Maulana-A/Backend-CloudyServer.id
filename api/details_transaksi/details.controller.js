const models = require("../../models/index");
const details = models.detail_transaksi;

module.exports = {
  controllerGetDetails: async (req, res) => {
    await details
      .findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [
          {
            model: models.product,
            as: "products",
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
            include: [
              {
                model: models.category_store,
                as: "product_category",
                attributes: ["name"]
              }
            ]
          }
        ]
      })
      .then(result => {
        res.json({
          data: result
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  controllerGetDetailsById: async (req, res) => {
    await details
      .findOne({
        where: {
          id: req.params.id
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [
          {
            model: models.product,
            as: "products",
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
            include: [
              {
                model: models.category_store,
                as: "product_category",
                attributes: ["name"]
              }
            ]
          }
        ]
      })
      .then(result => {
        res.json({
          data: result
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  controllerAddDetails: async (req, res) => {
    try {
      for (let i = req.body.length; i > req.body.length - 1; req.body--) {
        try {
          req.body.map(async item => {
            const getPrice = await models.product.findOne({
              where: {
                id: item.product_id
              }
            });
            const data = {
              transaksi_id: item.transaksi_id,
              product_id: item.product_id,
              total_barang: item.total_barang,
              total_price: getPrice.price * item.total_barang
            };

            await details
              .create(data)
              .then(result => {
                res.status(200).end();
              })
              .catch(err => {
                console.log(err);
              });
          });
          res.json({
            data: req.body
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  controllerUpdateDetails: async (req, res) => {
    try {
        for (let i = req.body.length; i > req.body.length - 1; req.body--) {
          try {
            req.body.map(async item => {
              const getPrice = await models.product.findOne({
                where: {
                  id: item.product_id
                }
              });
              const data = {
                transaksi_id: item.transaksi_id,
                product_id: item.product_id,
                total_barang: item.total_barang,
                total_price: getPrice.price * item.total_barang
              };
  
              await details
                .update(data, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(result => {
                  res.status(200).end();
                })
                .catch(err => {
                  console.log(err);
                });
            });
            res.json({
              data: req.body
            });
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
  },
  controllerDeleteDetails: async (req, res) => {
    await details
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        res.json({
          message: "data was deleted successfully"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
