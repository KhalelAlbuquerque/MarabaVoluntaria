import Post from "../models/Post.js"
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import User from "../models/User.js"
import mongoose from "mongoose"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export default class PostController{

    static async getAllPosts(req,res){
        try{

            const allPosts = await Post.find().select('-image').exec()

            if(!allPosts){
                return res.status(404).json({'messsage': 'Sem posts cadastrados'})
            }

            return res.status(200).json({'posts': allPosts})
        }catch(err){
            return res.status(500).json({'message': err.message})
        }
    }


    static async getPost(req,res){
        try{
            const {id} = req.params

            const post = await Post.findOne({_id:id}).select('-image').exec()

            if(!post){
                return res.status(404).json({'messsage': 'Post não encontrado'})
            }

            return res.status(200).json({'post': post})

        }catch(err){
            return res.status(500).json({'message': err.message})
        }
    }


    static async createPost(req,res){
        try{
            
            let {
                title, 
                description, 
                startDate, 
                endDate, 
                weeklyHours, 
                userId
            } = req.body

            userId = new mongoose.Types.ObjectId(userId)

            const user = await User.findOne({_id:userId})
            if(!user){
                return res.status(400).json({'message': 'Usuário não encontrado'})
            }

            if(user.cnpj==0){
                return res.status(500).json({'message': 'Apenas ongs podem cadastrar vagas'})
            }

            const isPostInDB = await Post.findOne({user: user.id, title: title})
            if(isPostInDB){
                return res.status(500).json({'message': "Post já cadastrado"})
            }

            let base64Image

            if (!req.file) {
                const filePath = path.join(__dirname, '..', 'public', 'ongPfp64.txt')
                base64Image = await fs.readFile(filePath, 'utf-8')
            }else{
                base64Image = req.file.buffer.toString('base64')
            }

            const newPost = await Post.create({
                title, 
                description, 
                startDate, 
                endDate, 
                weeklyHours, 
                image: base64Image,
                user: new mongoose.Types.ObjectId(userId)
            })

            return res.status(201).json({'success': `Post ${newPost.title} criado!`})

        }catch(err){
            return res.status(500).json({'message': err.message})
        }
    }

    
    static async updatePost(req,res){
        try{
            if(!req.body?.id){
                return res.status(400).json({'message': 'Insira um id para alteração'})
            }

            const post = await Post.findOne({_id: req.body.id}).exec()
            
            if(!post){
                return res.status(500).json({'message': `Nenhum post encontrado com o id ${req.body.id}`})
            }

            if(req.body?.title) post.title = req.body.title
            if(req.body?.description) post.description = req.body.description
            if(req.body?.startDate) post.startDate = req.body.startDate
            if(req.body?.endDate) post.endDate = req.body.endDate
            if(req.body?.weeklyHours) post.weeklyHours = req.body.weeklyHours

            const result = await post.save()

            res.status(200).json({'message': {'newData':result}})
        }catch(err){
            return res.status(500).json({'message': err.message})
        }
    }


    static async deletePost(req, res) {
        try {
            if (!req.body?.id) {
                return res.status(400).json({ 'message': 'Insira um id para deletar' })
            }
    
            const post = await Post.findOne({ _id: req.body.id })
    
            if (!post) {
                return res.status(400).json({ 'message': `Post ${req.body.id} não encontrado!` })
            }
    
            await Post.deleteOne({ _id: req.body.id })
    
            return res.status(200).json({ 'message': `Post ${req.body.id} excluído!` })
        } catch (err) {
            return res.status(500).json({ 'message': err.message })
        }
    }
    

}