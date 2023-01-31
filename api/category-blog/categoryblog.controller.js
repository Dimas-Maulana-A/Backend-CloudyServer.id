const models = require('../../models/index');
const category_blog = models.category_blog

module.exports = {
    controllerGetCategoryBlog: async(req, res)=> {
        await category_blog.findAll({
            attributes: ['id','name']
        })
        .then(result=> {
            res.json({
                data: result
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerGetCategoryBlogById: async(req, res)=> {
        let {id} = req.params
        await category_blog.findOne({
            where: {id: id},
            attributes: ['id', 'name']
        })
        .then(result=> {
            res.json({
                data: result
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerAddCategoryBlog: async(req, res)=> {
        let {name} = req.body
        let data = {
            name: name
        }

        await category_blog.create(data)
        .then(result=> {
            res.json({
                data: data
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerUpdateCategoryBlog: async(req, res)=> {
        let {id} = req.params
        let {name} =req.body
        let data ={
            name : name
        }
        await category_blog.update(data,{
            where: {id: id}
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
    controllerDeleteCategoryBlog: async(req, res)=> {
        let {id} =req.params
        await category_blog.destroy({
            where: {id: id}
        })
        .then(result=> {
            res.json({
                message: "data was deleted"
            })
        })
        .catch(err=> {
            console.log(err)
        })
    }
}
