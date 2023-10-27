import User from "../models/User.js"
import Ong from "../models/Ong.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import generateAccessToken from "../helpers/genAccessToken.js"

export default class AuthController {

    static async userLogin(req,res){
        try{
            const {email, password} = req.body

            const user = await User.findOne({email: email}).select('+password')
            if(user){
                const matchPass = await bcrypt.compare(password, user.password)

                if(!matchPass) return res.status(401).json({message:'Credenciais inválidas'})

                const AccessToken = generateAccessToken({
                    id: user._id,
                    role: user.role,
                })

                return res.status(200).json({
                    'message' : 'User Logado!',
                    'userId': `${user._id}`,
                    'userName': `${user.name}`,
                    'userImg': `${user.profPicture}`,
                    'accessToken': `${AccessToken}`,
                })
            }

            const ong = await Ong.findOne({email: email})
            if(ong){
                return res.status(400).json({'message': "Email cadastrado como Ong"})
            }


            return res.status(404).json({message:'Credenciais inválidas'})
            
        }catch(err){
            return res.status(500).json({'message':`COD 0103 - Error: ${err.message}`})
        }

    }

    static async ongLogin(req,res){
        try{
            const {email, password} = req.body

            const ong = await Ong.findOne({email: email}).select('+password')
            if(ong){
                const matchPass = await bcrypt.compare(password, ong.password)

                if(!matchPass) return res.status(401).json({message:'Credenciais inválidas'})

                const AccessToken = generateAccessToken({
                    id: ong._id,
                    role: ong.role,
                })

                return res.status(200).json({
                    'message' : 'ONG Logada!',
                    'ongId': `${ong._id}`,
                    'ongName': `${ong.name}`,
                    'ongImg': `${ong.profPicture}`,
                    'accessToken': `${AccessToken}`
                })
            }

            const user = await User.findOne({email: email})
            if(user){
                return res.status(400).json({'message': "Email cadastrado como usuário"})
            }

            return res.status(404).json({message:'Credenciais inválidas'})
            
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