import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ExpireToken from '../models/ExpireToken.js'
import generateAccessToken from "../helpers/genAccessToken.js"

export default class AuthController {

    static async login(req,res){
        const {email, password} = req.body

        const user = await User.findOne({email: email})
        if(!user) return res.status(400).json({'message': "Usuario nao encontrado"})

        const matchPass = await bcrypt.compare(password, user.password)

        if(!matchPass) return res.status(200).json({'message':'Senhas nao batem'})


        const RefreshToken = await jwt.sign({
            userId: user._id
        }, process.env.ACCESS_TOKEN_SECRET)

        const AccessToken = generateAccessToken({
            id: user._id,
            role: user.role,
            refreshToken: RefreshToken
        })

        await ExpireToken.create({'token': RefreshToken})

        return res.status(200).json({'success': `Usuario logado -> ${user.name}... AccessToken: ${AccessToken}... RefreshToken: ${RefreshToken}`})

    }

}