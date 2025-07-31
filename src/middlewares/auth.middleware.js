//Set Coustom Middleware 

const jwt = require('jsonwebtoken');

const userModel = require('../models/user.model');


async function authMiddleware (req,res,next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Please Login First"
        })
    }

try {
    const decode = jwt.verify(token,process.env.JWT_SECRET)

    const user = await userModel.findById({
        _id:decode.id
    })

 req.user = user 
 next()

} catch (error) {
    return res.status(401).json({
        message:"Invalid Token , Login Again"
    })
}
    
}


module.exports = authMiddleware;
