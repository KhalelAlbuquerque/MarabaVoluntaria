import User from '../models/User.js' 
import bcrypt from 'bcrypt' 
import path from 'path' 
import fs from 'fs/promises'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

export default class UserController{

    static async createUser(req,res){
        try{
            const {name, email, cnpj=null, role, password} = req.body
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
            if(await User.findOne({cnpj: cnpj}).exec()){
                return res.status(400).json({message: 'Ong já cadastrada'})
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

            return res.status(201).json({'success': `Novo usuario -> ${name}`})
        }catch(err){
            return res.status(500).json({'message': err.message})
        }
    }

}