import User from '../models/User.js' 
import bcrypt from 'bcrypt' 
import path from 'path' 
import fs from 'fs/promises'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

export default class UserController{

    static async getAllUsers(req,res){
        try{
                                                    // ignorar a foto
            const allUsers = await User.find().select('-profPicture').exec()
            
            if(!allUsers){
                return res.status(404).json({'messsage': 'Sem usuários'})
            }

            return res.status(200).json({'users': allUsers})

        }catch(err){
            return res.status(500).json({'message': err.message}) 
        }
    }


    static async getUser(req,res){
        try{
                                                                // ignorar a foto
            const user = await User.findOne({_id : req.params.id}).select('-profPicture').exec()

            if(!user){
                return res.status(404).json({'messsage': 'Usuário não encontrado'})
            }

            return res.status(200).json({'user': user})

        }catch(err){
            return res.status(500).json({'message': err.message}) 
        }
    }


    static async createUser(req,res){
        try{
            const {name, email, cnpj=Number(0), role, password} = req.body
            let base64Image

            if (!req.file) {
                const filePath = path.join(__dirname, '..', 'public', 'pfp64.txt')
                base64Image = await fs.readFile(filePath, 'utf-8')
            }else{
                base64Image = req.file.buffer.toString('base64')
            }

            if(await User.findOne({email: email}).exec()){
                return res.status(400).json({message: 'Usuário já existe'})
            }
            
            if(cnpj!==0){
                if(await User.findOne({cnpj: cnpj}).exec()){
                    return res.status(400).json({message: 'Ong já cadastrada'})
                }
            }

            const salt = process.env.SALT

            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = await User.create({
                name,
                email,
                cnpj,
                role,
                password: hashedPassword,
                profPicture: base64Image
            })

            return res.status(201).json({'success': `Novo usuario -> ${newUser.name}`})
        }catch(err){
            return res.status(500).json({'message': err.message})
        }
    }


    static async updateUser(req,res){

        try{
            if(!req.body?.id){
                return res.status(400).json({'message': 'Insira um id para alteração'})
            }
    
            const user = await User.findOne({_id: req.body.id}).exec()
    
            if(!user){
                return res.status(500).json({'message': `Nenhum usuário encontrado com o id ${req.body.id}`})
            }
    
            if(req.body?.name) user.name = req.body.name
            if(req.body?.email) user.email = req.body.email
            if(req.body?.cnpj) user.cnpj = req.body.cnpj
    
            const result = await user.save()
    
            res.status(200).json({'message': {'newData':result}})
        }catch(err){
            return res.status(500).json({'message': err.message})
        }

    }

}