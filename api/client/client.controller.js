const models = require("./../../models/index");
const client = models.client;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  controllerGetClient: async (req, res) => {
    await client
      .findAll({
        attributes: ["id", "name", "username", "email", "phone", "address"],
      })
      .then((result) => {
        res.json({
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  controllerGetClientById: async (req, res) => {
    let { id } = req.params;
    await client
      .findOne({
        where: { id: id },
        attributes: ["id", "name", "username", "email", "phone", "address"],
      })
      .then((result) => {
        res.json({
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  controllerAddClient: async (req, res) => {
    let { name, username, email, password, phone, address } = req.body;
    await client
      .findOne({
        where: {
          email: email,
        },
      })
      .then(async (result) => {
        if (result.email == email) {
          res.json({
            message: "email already exists",
          });
        }
      })
      .catch(async (err) => {
        await client
          .findOne({
            where: {
              username: username,
            },
          })
          .then((results) => {
            if (results.username == username) {
              res.json({
                message: "username already exists",
              });
            }
          })
          .catch(async (err) => {
            let salt = await bcrypt.genSalt();
            let hashPass = await bcrypt.hash(password, salt);
            let data = {
              name: name,
              username: username,
              email: email,
              password: hashPass,
              phone: phone,
              address: address,
            };
            await client
              .create(data)
              .then((result_data) => {
                res.json({
                  data: data,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
      });
  },

  controllerUpdateClient: async (req, res) => {
    let { id } = req.params;
    let { name, username, email, password, phone, address } = req.body;
    await client
      .findOne({
        where: {
          email: email,
        },
      })
      .then(async (result) => {
        if (result.email == email) {
          res.json({
            message: "email already exists",
          });
        }
      })
      .catch(async (err) => {
        await client
          .findOne({
            where: {
              username: username,
            },
          })
          .then((results) => {
            if (results.username == username) {
              res.json({
                message: "username already exists",
              });
            }
          })
          .catch(async (err) => {
            let salt = await bcrypt.genSalt();
            let hashPass = await bcrypt.hash(password, salt);
            let data = {
              name: name,
              username: username,
              email: email,
              password: hashPass,
              phone: phone,
              address: address,
            };
            await client
              .update(data, {
                where: {
                  id: id,
                },
              })
              .then((result_data) => {
                res.json({
                  data: data,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
      });
  },

  // Delete Client
  controllerDeleteClient: async (req, res) => {
    let { id } = req.params;
    await client
      .destroy({
        where: { id: id },
      })
      .then((result) => {
        res.json({
          message: "data was deleted successfully",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  controllerLoginClient: async (req, res) => {
    try {
      let client_login = await client.findOne({
        where: {
          email: req.body.email,
        },
      });
      const match = await bcrypt.compare(req.body.password, client_login.password);
      if (!match) {
        res.json({
          message: "Wrong Password",
        });
      } else {
        const email = client_login.email;
        const username = client_login.username;

        const signs = jwt.sign({ email, username }, process.env.CLIENT_TOKEN);

        let client_data =await client.findOne({
          where: { email: email },        
          attributes: ["id", "name", "username", "email", "phone", "address"],
        });

        res.json({
          data: client_data,
          token: signs,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        message: "Email not found",
      });
    }
  }
};
