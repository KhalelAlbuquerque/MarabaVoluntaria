import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import RefreshToken from '../models/RefreshToken.js'
import generateAccessToken from "../helpers/genAccessToken.js"

export default class AuthController {

    static async login(req,res){
        try{
            const {email, password} = req.body

            const user = await User.findOne({email: email})
            if(!user) return res.status(400).json({'message': "Usuario nao encontrado"})

            const matchPass = await bcrypt.compare(password, user.password)

            if(!matchPass) return res.status(200).json({'message':'Senhas nao batem'})


            const newRefreshToken = await jwt.sign({
                userId: user._id
            }, process.env.REFRESH_TOKEN_SECRET)

            const AccessToken = generateAccessToken({
                id: user._id,
                role: user.role,
                refreshToken: newRefreshToken
            })

            await RefreshToken.create({'token': newRefreshToken})

            // return res.status(200).json({'success': `id ->> ${user._id} ---------- Usuario logado -> ${user.name}... AccessToken: ${AccessToken}... RefreshToken: ${newRefreshToken}`})
            if(user.role === 2002){
                return res.status(200).json({
                    'message' : 'ONG Logada!',
                    'userId': `${user._id}`,
                    'userName': `${user.name}`,
                    'AccessToken': `${AccessToken}`,
                    'RefreshToken': `${newRefreshToken}`
                })
            }else{
                return res.status(200).json({
                    'message' : 'User Logado!',
                    'userId': `${user._id}`,
                    'userName': `${user.name}`,
                    'AccessToken': `${AccessToken}`,
                    'RefreshToken': `${newRefreshToken}`
                })
            }
        }catch(err){
            return res.status(500).json({'message':err.message})
        }

    }



    static async logout(req,res){
        const authHeader = await req.headers['authorization']
        const accesstoken = authHeader && authHeader.split(' ')[1]

        let refToken = false

        try{
            refToken = await jwt.decode(accesstoken).refreshToken
        }catch(err){
            return res.status(500).json({'message': "Invalid Token"})
        }

        if(!refToken) return res.status(400).json({'message': "Sem token no decode"})


        // TIRAR O TOKEN DO COOKIE
        await RefreshToken.deleteOne({token: refToken})  
        return res.status(200).json({'message': "Deslogado!"})
    }

}