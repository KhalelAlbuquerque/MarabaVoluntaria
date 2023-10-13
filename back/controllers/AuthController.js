import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class AuthController {

    static async login(req,res){
        const {email, password} = req.body

        const user = await User.findOne({email: email})
        if(!user) return res.status(400).json({'message': "Usuario nao encontrado"})

        const matchPass = await bcrypt.compare(password, user.password)

        if(!matchPass) return res.status(200).json({'message':'Senhas nao batem'})


        const token = await jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET)

        return res.status(200).json({user, token})

    }

}