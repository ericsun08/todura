const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUpUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body

    if(!first_name){
        return res.status(400).json({message:'First name is required'})
    }

    if(!last_name){
        return res.status(400).json({message:'Last name is required'})
    }
    if(!email){
        return res.status(400).json({message:'Email is required'})
    }
    if(!password){
        return res.status(400).json({message:'Password is required'})
    }

    const isEmailExist = await User.findOne({email:email})

    if(isEmailExist){
        return res.status(400).json({message:'Email already exist, please use another email.'})
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword
        }

        const user = await User.create(newUser)
        if(user){
            res.status(200).json({message: 'your account is successfully signed up'})
        }
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    if(!email){
        return res.status(400).json({message: 'Email is required'})
    }

    if(!password){
        return res.status(400).json({message: 'Password is required'})
    }

    try{
        const isEmailValid = await User.findOne({email: email})

        if(!isEmailValid){
            return res.status(400).json({message: 'Email is not registered yet'})
        } 

        const userInfo = {
            first_name: isEmailValid.first_name,
            last_name: isEmailValid.last_name,
            email: isEmailValid.email
        }

        const isPasswordValid = await bcrypt.compare(password, isEmailValid.password)

        if(isPasswordValid){
            const token = jwt.sign({isEmailValid}, process.env.SECRET)
            
            res.status(200).json({message:'User loggedin', user: userInfo, token: token})
        } else {
            res.status(400).json({message:'Password Invalid'})
        }
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    signUpUser,
    loginUser
}