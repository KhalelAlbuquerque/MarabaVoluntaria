import User from '../models/User.js'
import Post from '../models/Post.js'

export default class AdminController{

    static async approvePost(req,res){
        try{
            const {postId} = req.params

            const post = await Post.findOne({_id:postId}).select('-image').exec()

            if(!post) return res.status(404).json({'message': "Post não encontrado!"})

            if(post.status === 'rejected') return res.status(400).json({'message': "Post já reprovado anteriormente!"})

            if(post.status === 'approved') return res.status(400).json({'message': "Post já aprovado!"})

            post.status = 'approved'
            await post.save()

            return res.status(200).json({'message': 'Post aprovado!', post})
        }catch(e){
            return res.status(200).json({'message': e.message})
        }
    }

    static async reprovePost(req,res){
        try{
            const {postId} = req.params

            const post = await Post.findOne({_id:postId}).select('-image').exec()

            if(!post) return res.status(404).json({'message': "Post não encontrado!"})

            if(post.status === 'approved') return res.status(400).json({'message': "Post já aprovado anteriormente!"})

            if(post.status === 'rejected') return res.status(400).json({'message': "Post já reprovado!"})

            post.status = 'rejected'
            await post.save()

            return res.status(200).json({'message': 'Post recusado!', post})
        }catch(e){
            return res.status(200).json({'message': e.message})
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
    

    static async getPostsToApprove(req,res){
        
        try{
            console.log("buscando....");
            const posts = await Post.find({status: 'pending'}).select('-image').exec();
            console.log("result:", posts);


            if(!posts) return res.status(200).json({"posts": []})

            return res.status(200).json({'posts': posts})
        }catch(e){
            return res.status(500).json({'message': e.message})
        }
    }

    static async getOnePostToApprove(req,res){

        try{
            const {postId} = req.params

            const post = await Post.find({_id: postId}).exec()

            if(!post) return res.status(200).json({'message': 'Post não encontrado'})
            if(post.status === 'approved') return res.status(200).json({'message': 'Esse post já foi aprovado anteriormente!'})   
            if(post.status === 'reproved') return res.status(200).json({'message': 'Esse post já foi reprovado anteriormente!'})

            return res.status(200).json({'post': post})
        }catch(e){
            return res.status(500).json({'message': e.message})
        }

    }

}