const models = require('../../models/index');
const category_store = models.category_store

module.exports = {
    controllerGetCategoryStore: async(req, res)=> {
        await category_store.findAll({
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
    controllerGetCategoryStoreById: async(req, res)=> {
        let {id} = req.params
        await category_store.findOne({
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
    controllerAddCategoryStore: async(req, res)=> {
        let {name} = req.body
        let data = {
            name: name
        }

        await category_store.create(data)
        .then(result=> {
            res.json({
                data: data
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerUpdateCategoryStore: async(req, res)=> {
        let {id} = req.params
        let {name} =req.body
        let data ={
            name : name
        }
        await category_store.update(data,{
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
    controllerDeleteCategoryStore: async(req, res)=> {
        let {id} =req.params
        await category_store.destroy({
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
