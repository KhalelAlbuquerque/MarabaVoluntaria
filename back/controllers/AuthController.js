import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import generateAccessToken from "../helpers/genAccessToken.js"

export default class AuthController {

    static async login(req,res){
        try{
            const {email, password} = req.body

            const user = await User.findOne({email: email})
            if(!user) return res.status(404).json({'message': "COD: 0101 - Usuario nao encontrado"})

            const matchPass = await bcrypt.compare(password, user.password)

            if(!matchPass) return res.status(401).json({'message':'COD: 0102 - Senha incorreta'})

            const AccessToken = generateAccessToken({
                id: user._id,
                role: user.role,
            })

            localStorage.setItem('token', AccessToken)
            if(user.role === 'Ong'){
                return res.status(200).json({
                    'message' : 'ONG Logada!',
                    'userId': `${user._id}`,
                    'userName': `${user.name}`,
                    'accessToken': `${AccessToken}`,
                })
            }else{
                return res.status(200).json({
                    'message' : 'User Logado!',
                    'userId': `${user._id}`,
                    'userName': `${user.name}`,
                    'accessToken': `${AccessToken}`,
                })
            }
        }catch(err){
            return res.status(500).json({'message':`COD 0103 - Error: ${err.message}`})
        }

    }



    static async logout(req,res){
        try{
            let header = await req.headers['authorization']

            const newToken = await jwt.sign({text: "You are logged out"}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 1})

            header = `Bearer ${newToken}`
            localStorage.setItem('token', newToken)
            res.status(200).json({"message": "User deslogado!"})
            
        }catch(err){
            return res.status(500).json({'message': `COD 0104 - ${err.message}`})
        }
    }

}