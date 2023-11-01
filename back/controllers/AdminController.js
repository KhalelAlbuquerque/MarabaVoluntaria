import User from '../models/User.js'
import Post from '../models/Post.js'

export default class AdminController{

    static async approvePost(req,res){
        try{
            const {postId} = req.params

            const post = await Post.findOne({_id:postId}).exec()

            if(!post) return res.status(404).json({'message': "Post não encontrado!"})

            post.status = 'approved'
            await post.save()

            return res.status(200).json({'message': 'Post aprovado!'})
        }catch(e){
            return res.status(200).json({'message': e.message})
        }
    }

    static async reprovePost(req,res){
        try{
            const {postId} = req.params

            const post = await Post.findOne({_id:postId}).exec()

            if(!post) return res.status(404).json({'message': "Post não encontrado!"})

            post.status = 'rejected'
            await post.save()

            return res.status(200).json({'message': 'Post recusado!'})
        }catch(e){
            return res.status(200).json({'message': e.message})
        }
    }

}