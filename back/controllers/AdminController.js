import User from '../models/User.js'
import Post from '../models/Post.js'

export default class AdminController{

    static async approvePost(req,res){
        try{
            const {postId} = req.params

            const post = await Post.findOne({_id:postId}).select('-image').exec()

            if(!post) return res.status(404).json({'message': "Post não encontrado!"})

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

            if(post.status === 'rejected') return res.status(400).json({'message': "Post já reprovado!"})

            post.status = 'rejected'
            await post.save()

            return res.status(200).json({'message': 'Post recusado!', post})
        }catch(e){
            return res.status(200).json({'message': e.message})
        }
    }

}