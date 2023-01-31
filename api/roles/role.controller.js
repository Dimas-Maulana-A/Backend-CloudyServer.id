const models = require('../../models/index');
const role = models.role

module.exports = {
    controllerGetRole: async(req, res)=> {
        await role.findAll({
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
    controllerGetRoleById: async(req, res)=> {
        let {id} = req.params
        await role.findOne({
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
    controllerAddRole: async(req, res)=> {
        let {name} = req.body
        let data = {
            name: name
        }

        await role.create(data)
        .then(result=> {
            res.json({
                data: data
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerUpdateRole: async(req, res)=> {
        let {id} = req.params
        let {name} =req.body
        let data ={
            name : name
        }
        await role.update(data,{
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
    controllerDeleteRole: async(req, res)=> {
        let {id} =req.params
        await role.destroy({
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