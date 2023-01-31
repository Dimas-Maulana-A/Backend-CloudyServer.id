const jwt = require('jsonwebtoken');

const AuthAdmin = (req, res, next)=> {
    const authHeader = req.headers.authorization

    if(authHeader){
        let token = authHeader.split(' ')[1]

        let verifiedUser = jwt.verify(token, process.env.TOKEN)
        if( !verifiedUser) return res.status(401).send('Unauthorized request')

        res.user = verifiedUser
        next()
    }else{
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

module.exports = AuthAdmin