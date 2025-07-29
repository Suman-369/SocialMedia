
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function registerController(req,res){
    const {username,password} = req.body

    const isExistUser = await userModel.findOne({
        username
    })

    if(isExistUser){
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const user = await userModel.create({
        username,
        password
    })

    const token = jwt.sign({
        id:user._id,

    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"User Created SuccessFully",
        user
    })
}

async function loginController(req,res){
    const {username,password} = req.body

    const user = await userModel.findOne({username})

    if(!user){
        res.status(404).json({
            message:"user not found"
        })
    }

    const isCorrectPassword = user.password === password

    if(!isCorrectPassword){
        return res.status(401).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"Login SuccessFully",
        user
    })
}


module.exports = {
    registerController,
    loginController
}