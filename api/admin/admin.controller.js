const models = require("../../models/index");
const admin = models.admin;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  controllerGetAdmin: async (req, res) => {
    await admin
      .findAll({
        attributes: ["id", "name", "username", "password", "role_id"],
        include: [
          {
            model: models.role,
            as: "roles",
            attributes: ["name"],
          },
        ],
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
  controllerGetAdminById: async (req, res) => {
    let { id } = req.params;
    await admin
      .findOne({
        where: { id: id },
        attributes: ["id", "name", "username", "password", "role_id"],
        include: [
          {
            model: models.role,
            as: "roles",
            attributes: ["name"],
          },
        ],
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
  controllerAddAdmin: async (req, res) => {
    let { name, username, password, role_id } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);

    let data = {
      name: name,
      username: username,
      password: hashPass,
      role_id: role_id,
    };

    await admin
      .create(data)
      .then((result) => {
        res.json({
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  controllerUpdateAdmin: async (req, res) => {
    let { id } = req.params;
    let { name, username, password, role_id } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);

    let data = {
      name: name,
      username: username,
      password: hashPass,
      role_id: role_id,
    };

    await admin
      .update(data, {
        where: { id: id },
      })
      .then((result) => {
        res.json({
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  controllerDeleteAdmin: async (req, res) => {
    let { id } = req.params;
    await admin
      .destroy({
        where: { id: id },
      })
      .then((result) => {
        res.json({
          message: "data was deleted",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  controllerLoginAdmin: async (req, res) => {
    try {
      let datalog = await admin.findOne({
        where: {
          username: req.body.username,
        },
      });
      const match = await bcrypt.compare(req.body.password, datalog.password);
      if (!match) {
        res.json({
          message: "Wrong Password",
        });
      } else {
        const username = datalog.username;
        const password = datalog.password;

        const signs = jwt.sign({ username, password }, process.env.TOKEN);

        let admin_data =await admin.findOne({
          where: { username: username },
          attributes: ["id", "name", "username", "password", "role_id"],
          include: [
            {
              model: models.role,
              as: "roles",
              attributes: ["name"],
            },
          ],
        });

        res.json({
          data: admin_data,
          token: signs,
        });
      }
    } catch (error) {
      res.json({
        message: "Username not found",
      });
    }
  },
};
