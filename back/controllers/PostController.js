import Post from "../models/Post.js"
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import User from "../models/User.js"
import mongoose from "mongoose"
import findUserByToken from "../helpers/findUserByToken.js"

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
            } = req.body

            let userId = req.user.id

            userId = new mongoose.Types.ObjectId(userId)

            const user = await User.findOne({_id:userId})
            if(!user){
                return res.status(400).json({'message': 'Usuário não encontrado'})
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

            // return res.status(201).json({'success': `Post ${newPost.title} criado! ---- ID ${newPost._id}`})
            return res.status(200).json({
                'message' : 'Post Criado!',
                'postId': `${newPost._id}`,
                'postName': `${newPost.title}`
            })

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
    


    static async getPostVolunteers(req, res) {
        try {
            const { postId } = req.params
            const post = await Post.findOne({ _id: postId })
    
            if (!post) return res.status(400).json({ 'message': 'No post with this id' })
    
            const authHeader = req.headers['authorization']
            const accessToken = authHeader && authHeader.split(' ')[1]
    
            if (!accessToken) return res.status(403).json({ 'message': "No access token provided" })
    
            const findUser = await findUserByToken(accessToken)
    
            if (!findUser.isTokenValid) return res.status(403).json({ 'message': findUser.message })
    
            const user = findUser.user
    
            if (post.user.equals(user._id)) {
                if (post.volunteers && post.volunteers.length > 0) {
                    const userObjects = await Promise.all(
                        post.volunteers.map(async (volunteerId) => {
                            const postFound = await User.findOne({ _id: volunteerId })
                            return postFound
                        })
                    )
                    return res.status(200).json({ 'postVolunteers': userObjects })
                } else {
                    return res.status(200).json({ 'postVolunteers': [] }) // Retorna uma lista vazia de voluntários
                }
            } else {
                return res.status(400).json({ 'message': 'Apenas a ONG responsável pode ver isso' })
            }
        } catch (err) {
            return res.status(500).json({ 'message': err.message })
        }
    }



    static async endPost(req,res){

        try {
            const { postId } = req.params
            const post = await Post.findOne({ _id: postId })
    
            if (!post) return res.status(400).json({ 'message': 'No post with this id' })
    
            const authHeader = req.headers['authorization']
            const accessToken = authHeader && authHeader.split(' ')[1]
    
            if (!accessToken) return res.status(403).json({ 'message': "No access token provided" })
    
            const findUser = await findUserByToken(accessToken)
    
            if (!findUser.isTokenValid) return res.status(403).json({ 'message': findUser.message })
    
            const user = findUser.user
    
            if (post.user.equals(user._id)) {
                post.isClosed = true
                post.save()
                return res.status(200).json({ 'updatedPost': post})
            } else {
                return res.status(400).json({ 'message': 'Apenas a ONG responsável pode fechar uma vaga' })
            }
        } catch (err) {
            return res.status(500).json({ 'message': err.message })
        }

    }

}