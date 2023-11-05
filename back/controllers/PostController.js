import Post from "../models/Post.js"
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import User from "../models/User.js"
import mongoose from "mongoose"
import Ong from "../models/Ong.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export default class PostController{

    static async getAllPosts(req,res){
        try{

            const allPosts = await Post.find().select('-image').exec()

            if(!allPosts){
                return res.status(200).json({'posts': []})
            }

            return res.status(200).json({'posts': allPosts})
        }catch(err){
            return res.status(500).json({'message':`COD 0201 - Error: ${err.message}`})
        }
    }


    static async getPost(req,res){
        try{
            const {id} = req.params

            const post = await Post.findOne({_id:id}).select('-image').exec()

            if(!post){
                return res.status(404).json({'messsage': 'COD 0202 - Post não encontrado'})
            }

            return res.status(200).json({'post': post})

        }catch(err){
            return res.status(500).json({'message':`COD 0203 - Error: ${err.message}`})
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
                about
            } = req.body

            let userId = req.userInfo.id

            userId = new mongoose.Types.ObjectId(userId)

            let user = await User.findOne({_id:userId})
            if(!user){
                user = await Ong.findOne({_id:userId}).exec()
            }else{
                return res.status(404).json({'message': 'COD 0204 - Usuário não encontrado'})
            }



            const isPostInDB = await Post.findOne({owner: user.id, title: title})
            if(isPostInDB){
                return res.status(405).json({'message': "COD 0205 - Post já cadastrado"})
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
                about,
                image: base64Image,
                owner: new mongoose.Types.ObjectId(userId),
            })

            // return res.status(201).json({'success': `Post ${newPost.title} criado! ---- ID ${newPost._id}`})
            return res.status(200).json({
                'message' : 'Post Criado!',
                'postId': `${newPost._id}`,
                'postName': `${newPost.title}`
            })

        }catch(err){
            return res.status(500).json({'message':`COD 0206 - Error: ${err.message}`})
        }
    }

    
    static async updatePost(req,res){
        try{
            const {postId} = req.params
            if(!postId){
                return res.status(400).json({'message': 'COD 0207 - Insira um id para alteração'})
            }

            const post = await Post.findOne({_id: postId}).select('-image').exec()
            
            if(!post){
                return res.status(404).json({'message': `COD 0208 - Nenhum post encontrado com o id ${postId}`})
            }

            if(req.body?.title) post.title = req.body.title
            if(req.body?.description) post.description = req.body.description
            if(req.body?.about) post.about = req.body.about
            if(req.body?.startDate) post.startDate = req.body.startDate
            if(req.body?.endDate) post.endDate = req.body.endDate
            if(req.body?.weeklyHours) post.weeklyHours = req.body.weeklyHours

            const result = await post.save()

            res.status(200).json({result})
        }catch(err){
            return res.status(500).json({'message':`COD 0209 - Error: ${err.message}`})
        }
    }


    static async deletePost(req, res) {
        try {
            const {postId} = req.params

            if (!postId) {
                return res.status(400).json({ 'message': 'COD 0210 - Insira um id para deletar' })
            }
    
            const post = await Post.findOne({ _id: postId })
    
            if (!post) {
                return res.status(404).json({ 'message': `COD 0211 - Post ${postId} não encontrado!` })
            }
    
            await Post.deleteOne({ _id: postId })
    
            return res.status(200).json({ 'message': `Post ${postId} excluído!` })
        } catch (err) {
            return res.status(500).json({ 'message':`COD 0212 - Error: ${err.message}` })
        }
    }
    


    static async getPostVolunteers(req, res) {
        try {
            const { postId } = req.params

            if(!postId) return res.status(400).json({ 'message': 'COD 0213 - Insira um id para continuar' })

            const post = await Post.findOne({ _id: postId }).select('-image').exec()
    
            if (!post) return res.status(404).json({ 'message': 'COD 0214 - No post with this id' })
    
            const userId = req.userInfo.id

            if (post.owner.equals(userId)) {
                if (post.volunteers && post.volunteers.length > 0) {
                    const userObjects = await Promise.all(
                        post.volunteers.map(async (volunteerId) => {
                            const postFound = await User.findOne({ _id: volunteerId })
                            return postFound
                        })
                    )
                    return res.status(200).json({ 'postVolunteers': userObjects })
                } else {
                    return res.status(200).json({ 'postVolunteers': [] }) // Retorna uma lista vazia de voluntários caso não tenha
                }
            } else {
                return res.status(403).json({ 'message': 'COD 0217 - Apenas a ONG responsável pelo post pode ver isso' })
            }
        } catch (err) {
            return res.status(500).json({ 'message': `COD 0218 - ${err.message}` })
        }
    }



    static async endPost(req,res){

        try {
            const { postId } = req.params

            if(!postId) return res.status(400).json({ 'message': 'COD 0219 - Insira um id para continuar' })

            const post = await Post.findOne({ _id: postId })
    
            if (!post) return res.status(404).json({ 'message': 'COD 0220 - No post with this id' })
    
            const userId = req.userInfo.id
    
            if (post.owner.equals(userId)) {
                post.isClosed = true
                post.save()
                return res.status(200).json({ 'updatedPost': post})
            } else {
                return res.status(403).json({ 'message': 'COD 0223 - Apenas a ONG responsável pode fechar uma vaga' })
            }
        } catch (err) {
            return res.status(500).json({ 'message': `COD 0224 - ${err.message}` })
        }

    }


    static async searchPostByName(req, res) {
        const search = req.query.search;
        if (!search) return res.redirect('/post/');
        try {
            const regex = new RegExp(search, 'i');
            const posts = await Post.find({ title: { $regex: regex } }).select('-image').exec();
            
            return res.status(200).json(posts);
        } catch (err) {
            return res.status(500).json({ 'message': `COD 0225 - ${err.message}` });
        }
    }


}