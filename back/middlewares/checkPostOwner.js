import User from "../models/User.js";
import Post from "../models/Post.js";

export default async function checkPostOwner(req,res,next){

    try{
        // Recolhe o id do post no parametro
        const postId = req.params.postId
        // Busca o post no banco de dados
        const post = await Post.findOne({_id: postId})

        // Checa se o owner do post é o mesmo id de quem está fazendo a requisição ou que seja admin
        if(String(post.owner) === req.userInfo.id || req.userInfo.role === 'Admin'){
            return next()
        }
        return res.status(401).json({'message': 'Apenas o proprietário do post pode fazer isso.'})

    }catch(e){
        return res.status(500).json({'message': e.message})
    }

}