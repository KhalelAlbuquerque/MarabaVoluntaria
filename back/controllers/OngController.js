import Ong from '../models/User.js' 
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

    static async getAllOngs(req,res){
        try{
                                                    // ignorar a foto e senha
            const allOngs = await Ong.find().select('-profPicture').select('-password').exec()
            
            if(!allOngs){
                return res.status(200).json({'Ongs': []})
            }

            return res.status(200).json({'Ongs': allOngs})

        }catch(err){
            return res.status(500).json({'message':`COD 0301 - Error: ${err.message}`})
        }
    }


    static async getOng(req,res){
        try{
                                                                // ignorar a foto e senha
            const ong = await Ong.findOne({_id : req.params.ongId}).select('-profPicture').select('-password').exec()

            if(!ong){
                return res.status(404).json({'messsage': 'COD 0302 - Ong não encontrada'})
            }

            return res.status(200).json({'ong': ong})

        }catch(err){
            return res.status(500).json({'message':`COD 0303 - Error: ${err.message}`})
        }
    }


    static async createOng(req,res){
        try{
            let {name, description, about, email, cnpj, phoneNumber, password} = req.body
            let base64Image
 
            if (!req.file) {
                const filePath = path.join(__dirname, '..', 'public', 'pfp64.txt')
                base64Image = await fs.readFile(filePath, 'utf-8')
            }else{
                base64Image = req.file.buffer.toString('base64')
            }

            if(await Ong.findOne({email: email}).exec()){
                return res.status(405).json({message: 'COD 0304 - Ong já existe'})
            }

            const salt = process.env.SALT

            const hashedPassword = await bcrypt.hash(password, salt)

            const newOng = await User.create({
                name,
                about, 
                description, 
                email,
                phoneNumber,
                cnpj,
                role,
                password: hashedPassword,
                profPicture: base64Image
            })


            const AccessToken = generateAccessToken({
                id: newOng._id,
                role: newOng.role,
            })

            return res.status(200).json({
                'message' : 'ONG Registrada!',
                'userId': `${newUser._id}`,
                'userName': `${newUser.name}`,
                'accessToken': `${AccessToken}`,
            })

        }catch(err){
            return res.status(500).json({'message':`COD 0306 - Error: ${err.message}`})
        }
    }


    static async updateOng(req,res){

        try{
            const ongId = req.userInfo.id
    
            const ong = await Ong.findOne({_id:ongId}).exec()
            if(!ong){
                return res.status(404).json({'message': `COD 0308 - Nenhuma Ong encontrado com o id ${ongId}`})
            }
    
            if(req.body?.name) user.name = req.body.name
            if(req.body?.description) ong.description = req.body.description
            if(req.body?.about) ong.about = req.body.about
            if(req.body?.email) user.email = req.body.email
            if(req.body?.phoneNumber) user.phoneNumber = req.body.phoneNumber
    
            const result = await ong.save()
    
            res.status(200).json({'message': {'newData':result}})
        }catch(err){
            return res.status(500).json({'message':`COD 0309 - Error: ${err.message}`})
        }

    }

    static async deleteOng(req, res) {
        try {
            const ongId = req.userInfo.id
    
            const ong = await Ong.findOne({ _id: ongId })
    
            if (!ong) {
                return res.status(404).json({ 'message': `COD 0311 - Ong ${ongId} não encontrada!` })
            }
    
            await Ong.deleteOne({ _id: ongId })
    
            return res.status(200).json({ 'message': `Ong ${ongId} excluída!` })
        } catch (err) {
            return res.status(500).json({'message':`COD 0312 - Error: ${err.message}`})
        }
    }


    static async applyToPost(req,res){
        try{
            let {postId} = req.params

            if(!postId) return res.status(400).json({ 'message': 'COD 0313 - Insira um id para continuar' })

            const ongId = req.userInfo.id

            const post = await Post.findOne({_id: postId})

            if(!post) return res.status(404).json({'message': "COD 0316 - Post not found"})

            if((post.volunteers).includes(ongId)){
                return res.status(405).json({'message': `COD 0317 - Usuario ${ongId} já é cadastrado no post ${post._id}`})
            }

            await Ong.findOneAndUpdate(
                { _id: ongId },
                { $push: {postInscriptions: post._id} },
                { new: true },
            )

            await Post.findOneAndUpdate(
                { _id: post._id },
                { $push: {volunteers: ongId} },
                { new: true },
            )

            return res.status(200).json({'message': `User ${ongId} foi inscrito no post -> ${post._id}`})
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

            const ongId = req.userInfo.id

            const post = await Post.findOne({_id: postId})

            if(!post) return res.status(404).json({'message': "COD 0322 - Post not found"})

            if(!(post.volunteers).includes(ongId)){
                return res.status(405).json({'message': `COD 0323 - Usuario ${ongId} não é cadastrado no post ${post._id}, impossível desinscrever`})
            }

            await Ong.findOneAndUpdate(
                { _id: ongId },
                { $pull: {postInscriptions: post._id} },
                { new: true },
            )

            await Post.findOneAndUpdate(
                { _id: post._id },
                { $pull: {volunteers: ongId} },
                { new: true },
            )

            return res.status(200).json({'message': `User ${ongId} retirado de voluntario no post -> ${post._id}`})
        }catch(err){
            return res.status(500).json({'message':`COD 0324 - Error: ${err.message}`})
        }
        
    }


    static async getUserInscriptions(req,res){
        try{
            let postObjects = []
            
            const ongId = req.userInfo.id

            const ong = await Ong.findOne({_id: ongId})

            if(!ong) return res.status(404).json({'message': "No ong with this id"})

            if(ong.postInscriptions){
                await ong.postInscriptions.forEach(async(post)=>{
                    const postFound = await Post.find({_id: post._id})
                    if(postFound) postObjects.push(postFound)
                })
            }
        
            return res.status(200).json({'ongInscriptions': user.postInscriptions})
        }catch(err){
            return res.status(500).json({'message':`COD 0327 - Error: ${err.message}`})
        }

    }
    

    static async getOngs(req,res){

        try{

            const ongs = await Ong.find().select('-profPicture').exec()
            return res.status(200).json(ongs)

        }catch(err){
            return res.status(500).json({'message': `COD 0328 - ${err.message}`})
        }

    }

}