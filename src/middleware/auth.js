const User = require('../models/User')
const jwt = require('jsonwebtoken')

// this works as middleware for some requests
const auth = async (req, res, next) => {
    try{
        const authorization = req.header('Authorization').replace('Bearer ', '')
        const verified  = jwt.verify(authorization, process.env.SECRET_JWT)
        const user = await User.findOne({'_id' : verified._id, 'tokens.token' : authorization})

        if(!user){
            throw new Error()
        }
        req.token = authorization
        req.user = user
        next()
    }catch(e){
        res.status(401).send('Error : please authorize')
    }
}


module.exports = auth