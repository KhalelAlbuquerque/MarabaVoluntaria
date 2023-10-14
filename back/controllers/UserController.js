import User from '../models/User.js' 
import bcrypt from 'bcrypt' 
import path from 'path' 
import fs from 'fs/promises'
import jwt from 'jsonwebtoken'
import RefreshToken from '../models/RefreshToken.js'
import Post from '../models/Post.js'
import findUserByToken from '../helpers/findUserByToken.js'


import { fileURLToPath } from 'url'
import { dirname } from 'path'
import generateAccessToken from '../helpers/genAccessToken.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default class UserController{

    static async getAllUsers(req,res){
        try{
                                                    // ignorar a foto
            const allUsers = await User.find().select('-profPicture').exec()
            
            if(!allUsers){
                return res.status(404).json({'messsage': 'Sem usuários cadastrados'})
            }

            return res.status(200).json({'users': allUsers})

        }catch(err){
            return res.status(500).json({'message': err.message}) 
        }
    }


    static async getUser(req,res){
        try{
                                                                // ignorar a foto
            const user = await User.findOne({_id : req.params.id}).select('-profPicture').exec()

            if(!user){
                return res.status(404).json({'messsage': 'Usuário não encontrado'})
            }

            return res.status(200).json({'user': user})

        }catch(err){
            return res.status(500).json({'message': err.message}) 
        }
    }


    static async createUser(req,res){
        try{
            let {name, email, cnpj, role, password} = req.body
            let base64Image

            if (!req.file) {
                const filePath = path.join(__dirname, '..', 'public', 'pfp64.txt')
                base64Image = await fs.readFile(filePath, 'utf-8')
            }else{
                base64Image = req.file.buffer.toString('base64')
            }

            if(await User.findOne({email: email}).exec()){
                return res.status(400).json({message: 'Usuário já existe'})
            }
            
            if(cnpj!==0){
                if(await User.findOne({cnpj: cnpj}).exec()){
                    return res.status(400).json({message: 'Ong já cadastrada'})
                }
                
                console.log('1')
                role = 2002 
                // ONG
            }

            const salt = process.env.SALT

            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = await User.create({
                name,
                email,
                cnpj,
                role,
                password: hashedPassword,
                profPicture: base64Image
            })

            const newRefreshToken = await jwt.sign({
                userId: newUser._id
            }, process.env.REFRESH_TOKEN_SECRET)

            const AccessToken = generateAccessToken({
                id: newUser._id,
                role: newUser.role,
                refreshToken: newRefreshToken
            })

            await RefreshToken.create({'token': newRefreshToken})

            return res.status(201).json({'success': `Novo usuario -> ${newUser.name}... AccessToken: ${AccessToken}... RefreshToken: ${newRefreshToken}`})
        }catch(err){
            return res.status(500).json({'message': err.message})
        }
    }


    static async updateUser(req,res){

        try{
            if(!req.body?.id){
                return res.status(400).json({'message': 'Insira um id para alteração'})
            }
    
            const user = await User.findOne({_id: req.body.id}).exec()
    
            if(!user){
                return res.status(500).json({'message': `Nenhum usuário encontrado com o id ${req.body.id}`})
            }
    
            if(req.body?.name) user.name = req.body.name
            if(req.body?.email) user.email = req.body.email
            if(req.body?.cnpj) user.cnpj = req.body.cnpj
    
            const result = await user.save()
    
            res.status(200).json({'message': {'newData':result}})
        }catch(err){
            return res.status(500).json({'message': err.message})
        }

    }

    static async deleteUser(req, res) {
        try {
            if (!req.body?.id) {
                return res.status(400).json({ 'message': 'Insira um id para deletar' })
            }
    
            const user = await User.findOne({ _id: req.body.id })
    
            if (!user) {
                return res.status(400).json({ 'message': `User ${req.body.id} não encontrado!` })
            }
    
            await User.deleteOne({ _id: req.body.id })
    
            return res.status(200).json({ 'message': `User ${req.body.id} excluído!` })
        } catch (err) {
            return res.status(500).json({ 'message': err.message })
        }
    }


    static async applyToPost(req,res){
        try{
            const {postId} = req.params
            const authHeader = await req.headers['authorization']
            const accesstoken = authHeader && authHeader.split(' ')[1]

            if(!accesstoken) return res.status(403).json({ 'message': "No access token provided"})

            const findUser = await findUserByToken(accesstoken)

            if(!findUser.isTokenValid) return res.status(403).json({'message': findUser.message})
            
            // TOKEN HAS USER -- CONFIRMED
            const user = findUser.user

            const post = await Post.findOne({_id: postId})

            if(!post) return res.status(400).json({'message': "Post not found"})

            if((post.volunteers).includes(user._id)){
                return res.status(400).json({'message': `Usuario ${user._id} já é cadastrado no post ${post._id}`})
            }

            await User.findOneAndUpdate(
                { _id: user._id },
                { $push: {postInscriptions: post._id} },
                { new: true },
            )

            await Post.findOneAndUpdate(
                { _id: post._id },
                { $push: {volunteers: user._id} },
                { new: true },
            )

            return res.status(200).json({'message': `User ${user._id} inscrito no post -> ${post._id}`})
        }catch(err){
            return res.status(500).json({'message': err.message})
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
        const {postId} = req.params
        const authHeader = await req.headers['authorization']
        const accesstoken = authHeader && authHeader.split(' ')[1]

        if(!accesstoken) return res.status(403).json({ 'message': "No access token provided"})

        const findUser = await findUserByToken(accesstoken)

        if(!findUser.isTokenValid) return res.status(403).json({'message': findUser.message})
        
        // TOKEN HAS USER -- CONFIRMED
        const user = findUser.user

        const post = await Post.findOne({_id: postId})

        if(!post) return res.status(400).json({'message': "Post not found"})

        if(!(post.volunteers).includes(user._id)){
            return res.status(400).json({'message': `Usuario ${user._id} não é cadastrado no post ${post._id}, impossível desinscrever`})
        }

        await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: {postInscriptions: post._id} },
            { new: true },
        )

        await Post.findOneAndUpdate(
            { _id: post._id },
            { $pull: {volunteers: user._id} },
            { new: true },
        )

        return res.status(200).json({'message': `User ${user._id} retirado de voluntario no post -> ${post._id}`})

        
    }


    static async getUserInscriptions(req,res){
        try{
            let postObjects = []
            const authHeader = await req.headers['authorization']
            const accesstoken = authHeader && authHeader.split(' ')[1]

            if(!accesstoken) return res.status(403).json({ 'message': "No access token provided"})

            const findUser = await findUserByToken(accesstoken)
            if(!findUser.isTokenValid) return res.status(403).json({ 'message':findUser.message})

            const user = findUser.user

            if(user.postInscriptions){
                await user.postInscriptions.forEach(async(post)=>{
                    const postFound = await Post.find({_id: post._id})
                    if(postFound) postObjects.push(postFound)
                })
            }
        
            return res.status(200).json({'userInscritions': postObjects})
        }catch(err){
            return res.status(500).json({ 'message': err.message})
        }

    }

}