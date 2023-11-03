import User from "../models/User.js";
import Post from "../models/Post.js";
import { Types } from "mongoose";

export default async function checkPostOwner(req,res,next){

    try{
        const postId = req.params.postId

        const post = await Post.findOne({_id: postId})

        if(String(post.owner) === req.userInfo.id || req.userInfo.role === 'Admin'){
            return next()
        }

        return res.status(401).json({'message': 'Apenas o proprietário do post pode fazer isso.'})


    }catch(e){
        return res.status(500).json({'message': e.message})
    }

}