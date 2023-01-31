const models = require("./../../models/index");
const blog = models.blog;

const multer = require("multer");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image/blog/");
  },
  filename: (req, file, cb) => {
    cb(null, `image-blog-${Date.now()}.png`);
  },
});

const upload = multer({ storage: storage });

app.get("/", async (req, res) => {
  await blog
    .findAll({
      attributes: [
        "id",
        "title",
        "image",
        "content",
        "category",
        "admin",
        "createdAt",
      ],
      include: [
        {
          model: models.category_blog,
          as: "category_blog",
          attributes: ["name"],
        },
        {
          model: models.admin,
          as: "admin_blog",
          attributes: ["id", "name", "username", "password", "role_id"],
          include: [
            {
              model: models.role,
              as: "roles",
              attributes: ["name"],
            },
          ],
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
  await blog.findOne({
    where: {
      id: id,
    },
    attributes: [
      "id",
      "title",
      "image",
      "content",
      "category",
      "admin",
      "createdAt",
    ],
    include: [
      {
        model: models.category_blog,
        as: "category_blog",
        attributes: ["name"],
      },
      {
        model: models.admin,
        as: "admin_blog",
        attributes: ["id", "name", "username", "password", "role_id"],
        include: [
          {
            model: models.role,
            as: "roles",
            attributes: ["name"],
          },
        ],
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

app.post('/', upload.single("image"), async(req, res)=> {
  if(req.file){
    let {
      title, content, category, admin
    } = req.body
    let data = {
      title: title,
      image: req.file.filename,
      content: content,
      category: category,
      admin: admin
    }
  
    await blog.create(data)
    .then((result) => {
      res.json({
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }else{
    let {
      title, content, category, admin
    } = req.body
    let data = {
      title: title,
      content: content,
      category: category,
      admin: admin
    }
  
    await blog.create(data)
    .then((result) => {
      res.json({
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
})

app.put('/:id', upload.single("image"), async(req, res)=> {
  if(req.file){
    let {id} = req.params
    let results = await blog.findOne({where: {id: id}})
    let oldFile = results.image

    let dir = path.join(__dirname, "../../image/blog", oldFile)
    fs.unlink(dir, err=> console.log(err))

    let {
      title, content, category, admin
    } = req.body
    let data = {
      title: title,
      image: req.file.filename,
      content: content,
      category: category,
      admin: admin
    }

    await blog.update(data, {
      where: {
        id: id
      }
    })
    .then((result) => {
      res.json({
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }else {
    let {id} = req.params
    let resultss = await blog.findOne({
      where: {id: id},
    })
    let {
      title, content, category, admin
    } = req.body
    let datas = {
      title: title,
      image: resultss.image,
      content: content,
      category: category,
      admin: admin
    }

    await blog.update(datas, {
      where: {
        id: id
      }
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
})

app.delete('/:id', async(req, res)=> {
  try {
    let {id} = req.params
    let results = await blog.findOne({where: {id: id}})
    let oldFIleName = results.image

    let dir = path.join(__dirname,  "../../image/blog", oldFIleName)
    fs.unlink(dir, err=> console.log(err))
    blog.destroy({where: {id: id}})
    .then(result=> {
      res.json({
        message: "data was deleted"
      })
    })
    .catch(err=> {
      console.log(err)
    })
  } catch (error) {
    let {id} = req.params
    blog.destroy({where: {id: id}})
    .then(result=> {
      res.json({
        message: "data was deleted"
      })
    })
    .catch(err=> {
      console.log(err)
    })
  }
})

app.get('/image/:image', (req, res)=> {
  let {image} = req.params
  fs.readFile(`./image/blog/${image}`, (err, data)=> {
    res.writeHead(200, {
      'Content-Type': 'image/png'
    })
    res.end(data)
  })
})

module.exports = app;
