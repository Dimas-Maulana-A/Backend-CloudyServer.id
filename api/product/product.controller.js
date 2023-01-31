const models = require("./../../models/index");
const product = models.product;

const multer = require("multer");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image/store/");
  },
  filename: (req, file, cb) => {
    cb(null, `image-store-${Date.now()}.png`);
  },
});

const upload = multer({ storage: storage });

app.get("/", async (req, res) => {
  await product
    .findAll({
      attributes: ["id", "name", "image", "description", "category", "price"],
      include: [
        {
          model: models.category_store,
          as: "product_category",
          attributes: ["name"],
        }
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
});

app.get("/:id", async (req, res) => {
  let { id } = req.params;
  await product
    .findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "image", "description", "category", "price"],
      include: [
        {
          model: models.category_store,
          as: "product_category",
          attributes: ["name"],
        }
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
});

app.post("/", upload.single("image"), async (req, res) => {
  if (req.file) {
    let { name, description, category, price } = req.body;
    let data = {
      name: name,
      image: req.file.filename,
      description: description,
      category: category,
      price: price,
    };

    await product
      .create(data)
      .then((result) => {
        res.json({
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    let { name, description, category, price } = req.body;
    let data = {
      name: name,
      description: description,
      category: category,
      price: price,
    };

    await product
      .create(data)
      .then((result) => {
        res.json({
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.put("/:id", upload.single("image"), async (req, res) => {
  if (req.file) {
    let { id } = req.params;
    let results = await product.findOne({ where: { id: id } });
    let oldFile = results.image;

    let dir = path.join(__dirname, "../../image/store", oldFile);
    fs.unlink(dir, (err) => console.log(err));

    let { name, description, category, price } = req.body;
    let data = {
      name: name,
      image: req.file.filename,
      description: description,
      category: category,
      price: price,
    };

    await product
      .update(data, {
        where: {
          id: id,
        },
      })
      .then((result) => {
        res.json({
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    let { id } = req.params;
    let resultss = await product.findOne({
      where: { id: id },
    });
    let { name, description, category, price } = req.body;
    let datas = {
      name: name,
      image: resultss.image,
      description: description,
      category: category,
      price: price,
    };

    await product
      .update(datas, {
        where: {
          id: id,
        },
      })
      .then((result) => {
        res.json({
          data: datas,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let results = await product.findOne({ where: {id: id} });
    let oldFIleName = results.image;

    let dir = path.join(__dirname, "../../image/store", oldFIleName);
    fs.unlink(dir, (err) => console.log(err));
    product
      .destroy({ where: { id: id } })
      .then((result) => {
        res.json({
          message: "data was deleted",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    let { id } = req.params;
    product
      .destroy({ where: { id: id } })
      .then((result) => {
        res.json({
          message: "data was deleted",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.get("/image/:image", (req, res) => {
  let { image } = req.params;
  fs.readFile(`./image/store/${image}`, (err, data) => {
    res.writeHead(200, {
      "Content-Type": "image/png",
    });
    res.end(data);
  });
});

module.exports = app;
