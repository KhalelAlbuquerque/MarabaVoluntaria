import User from '../models/User.js' 
import bcrypt from 'bcrypt' 
import path from 'path' 
import fs from 'fs/promises'
import jwt from 'jsonwebtoken'
import Post from '../models/Post.js'
import mongoose from 'mongoose' 


import { fileURLToPath } from 'url'
import { dirname } from 'path'
import generateAccessToken from '../helpers/genAccessToken.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default class UserController{

    static async getAllUsers(req,res){
        try{
                                                    // ignorar a foto e senha
            const allUsers = await User.find().select('-profPicture').select('-password').exec()
            
            if(!allUsers){
                return res.status(200).json({'users': []})
            }

            return res.status(200).json({'users': allUsers})

        }catch(err){
            return res.status(500).json({'message':`COD 0301 - Error: ${err.message}`})
        }
    }


    static async getUser(req,res){
        try{
                                                                // ignorar a foto e senha
            const user = await User.findOne({_id : req.params.userId}).select('-profPicture').select('-password').exec()

            if(!user){
                return res.status(404).json({'messsage': 'COD 0302 - Usuário não encontrado'})
            }

            return res.status(200).json({'user': user})

        }catch(err){
            return res.status(500).json({'message':`COD 0303 - Error: ${err.message}`})
        }
    }


    static async createUser(req,res){
        try{
            let {name, email, cnpj, role, phoneNumber, password} = req.body
            let base64Image
 
            if (!req.file) {
                const filePath = path.join(__dirname, '..', 'public', 'pfp64.txt')
                base64Image = await fs.readFile(filePath, 'utf-8')
            }else{
                base64Image = req.file.buffer.toString('base64')
            }

            if(await User.findOne({email: email}).exec()){
                return res.status(405).json({message: 'COD 0304 - Usuário já existe'})
            }
            
            cnpj === undefined ? cnpj = 0 : cnpj=cnpj

            if(cnpj!=0){
                if(await User.findOne({cnpj: cnpj}).exec()){
                    return res.status(405).json({message: 'COD 0305 - Ong já cadastrada'})
                }
                role = "Ong" 
                // SE FOR UMA ONG, SETAR A ROLE COMO ONG
            }

            const salt = process.env.SALT

            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = await User.create({
                name,
                email,
                phoneNumber,
                cnpj,
                role,
                password: hashedPassword,
                profPicture: base64Image
            })


            const AccessToken = generateAccessToken({
                id: newUser._id,
                role: newUser.role,
            })

            if(newUser.role==="Ong"){
                return res.status(200).json({
                    'message' : 'ONG Registrada!',
                    'userId': `${newUser._id}`,
                    'userName': `${newUser.name}`,
                    'accessToken': `${AccessToken}`,
                })
            }else{
                return res.status(200).json({
                    'message' : 'User Registrado!',
                    'userId': `${newUser._id}`,
                    'userName': `${newUser.name}`,
                    'accessToken': `${AccessToken}`,
                })
            }
        }catch(err){
            return res.status(500).json({'message':`COD 0306 - Error: ${err.message}`})
        }
    }


    static async updateUser(req,res){

        try{
            const userId = req.userInfo.id
    
            const user = await User.findOne({_id:userId}).exec()
            if(!user){
                return res.status(404).json({'message': `COD 0308 - Nenhum usuário encontrado com o id ${userId}`})
            }
    
            if(req.body?.name) user.name = req.body.name
            if(req.body?.email) user.email = req.body.email
            if(req.body?.cnpj) user.cnpj = req.body.cnpj
            if(req.body?.phoneNumber) user.phoneNumber = req.body.phoneNumber
    
            const result = await user.save()
    
            res.status(200).json({'message': {'newData':result}})
        }catch(err){
            return res.status(500).json({'message':`COD 0309 - Error: ${err.message}`})
        }

    }

    static async deleteUser(req, res) {
        try {
            const userId = req.userInfo.id
    
            const user = await User.findOne({ _id: userId })
    
            if (!user) {
                return res.status(404).json({ 'message': `COD 0311 - User ${userId} não encontrado!` })
            }
    
            await User.deleteOne({ _id: userId })
    
            return res.status(200).json({ 'message': `User ${userId} excluído!` })
        } catch (err) {
            return res.status(500).json({'message':`COD 0312 - Error: ${err.message}`})
        }
    }


    static async applyToPost(req,res){
        try{
            let {postId} = req.params

            if(!postId) return res.status(400).json({ 'message': 'COD 0313 - Insira um id para continuar' })

            const userId = req.userInfo.id

            const post = await Post.findOne({_id: postId})

            if(!post) return res.status(404).json({'message': "COD 0316 - Post not found"})

            if((post.volunteers).includes(userId)){
                return res.status(405).json({'message': `COD 0317 - Usuario ${userId} já é cadastrado no post ${post._id}`})
            }

            await User.findOneAndUpdate(
                { _id: userId },
                { $push: {postInscriptions: post._id} },
                { new: true },
            )

            await Post.findOneAndUpdate(
                { _id: post._id },
                { $push: {volunteers: userId} },
                { new: true },
            )

            return res.status(200).json({'message': `User ${userId} foi inscrito no post -> ${post._id}`})
        }catch(err){
            return res.status(500).json({'message':`COD 0318 - Error: ${err.message}`})
        }

        // console.log(user)
        // postInscriptions: [],
        // _id: new ObjectId("USERID19827398H123"),
        // name: 'USERNAME',
        // email: 'USEREMAIL',
        // cnpj: '0',
        // password: '$2a$12$HASHEDPASS',
    }  


    static async unapplyFromPost(req,res){
        
        try{
            const {postId} = req.params

            if(!postId) return res.status(400).json({ 'message': 'COD 0319 - Insira um id para continuar' })

            const userId = req.userInfo.id

            const post = await Post.findOne({_id: postId})

            if(!post) return res.status(404).json({'message': "COD 0322 - Post not found"})

            if(!(post.volunteers).includes(userId)){
                return res.status(405).json({'message': `COD 0323 - Usuario ${userId} não é cadastrado no post ${post._id}, impossível desinscrever`})
            }

            await User.findOneAndUpdate(
                { _id: userId },
                { $pull: {postInscriptions: post._id} },
                { new: true },
            )

            await Post.findOneAndUpdate(
                { _id: post._id },
                { $pull: {volunteers: userId} },
                { new: true },
            )

            return res.status(200).json({'message': `User ${userId} retirado de voluntario no post -> ${post._id}`})
        }catch(err){
            return res.status(500).json({'message':`COD 0324 - Error: ${err.message}`})
        }
        
    }


    static async getUserInscriptions(req,res){
        try{
            let postObjects = []
            
            const userId = req.userInfo.id

            const user = await User.findOne({_id: userId})

            if(!user) return res.status(404).json({'message': "No user with this id"})

            if(user.postInscriptions){
                await user.postInscriptions.forEach(async(post)=>{
                    const postFound = await Post.find({_id: post._id})
                    if(postFound) postObjects.push(postFound)
                })
            }
        
            return res.status(200).json({'userInscriptions': user.postInscriptions})
        }catch(err){
            return res.status(500).json({'message':`COD 0327 - Error: ${err.message}`})
        }

    }
    

    static async getOngs(req,res){

        try{

            const ongs = await User.find({role: "Ong"}).select('-profPicture').exec()
            return res.status(200).json(ongs)

        }catch(err){
            return res.status(500).json({'message': `COD 0328 - ${err.message}`})
        }

    }

}