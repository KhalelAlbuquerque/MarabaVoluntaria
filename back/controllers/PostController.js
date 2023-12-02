import Post from "../models/Post.js"
import User from "../models/User.js"
import Ong from "../models/Ong.js"
import mongoose from "mongoose"
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import Image from '../models/Image.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default class PostController {

    // Método para obter todos os posts
    static async getAllPosts(req, res) {
        try {
            // Encontrar todos os posts e excluir as imagens
            const allPosts = await Post.find().exec()
            // Se não houver posts, responder com uma lista vazia
            if (!allPosts) {
                return res.status(200).json({ 'posts': [] })
            }
            // Responder com a lista de posts
            return res.status(200).json({ 'posts': allPosts })
        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0201 - Error: ${err.message}` })
        }
    }

    // Método para obter um post específico
    static async getPost(req, res) {
        try {
            // Obter o ID do post a partir dos parâmetros da requisição
            const { id } = req.params
            // Encontrar o post com o ID fornecido e excluir a imagem
            const post = await Post.findOne({ _id: id }).exec()
            // Se o post não for encontrado, responder com um erro 404 (Não Encontrado)
            if (!post) {
                return res.status(404).json({ 'message': 'COD 0202 - Post não encontrado' })
            }
            // Responder com o post
            return res.status(200).json({ 'post': post })

        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0203 - Error: ${err.message}` })
        }
    }

    // Método para criar um novo post
    static async createPost(req, res) {
        try {
            // Obter informações do post a partir do corpo da requisição
            let {
                title,
                description,
                startDate,
                endDate,
                weeklyHours,
                about,
                image
            } = req.body
            // Obter o ID do usuário a partir das informações de autenticação
            let userId = req.userInfo.id
            // Converter o ID do usuário em um tipo ObjectId do Mongoose
            userId = new mongoose.Types.ObjectId(userId)
            // Encontrar o usuário com o ID fornecido, podendo ser um usuário comum ou uma ONG
            let user = await Ong.findOne({ _id: userId })

            // Verificar se o post já está no banco de dados com base no proprietário (user) e no título
            const isPostInDB = await Post.findOne({ owner: user.id, title: title })
            if (isPostInDB) {
                return res.status(405).json({ 'message': "COD 0205 - Post já cadastrado" })
            }
            // Inicializar a variável para a imagem do post
            let postImageObject
            // Se não houver arquivo de imagem na solicitação, carregar uma imagem padrão
            if (!image) {
                const filePath = path.join(__dirname, '..', 'public', 'pfp64.txt')
                const imageBase64 = await fs.readFile(filePath, 'utf-8')
                let imageObject = await Image.create({image: imageBase64})
                postImageObject = await imageObject
            } else {
                postImageObject = image
            }
            // Criar um novo post no banco de dados
            const newPost = await Post.create({
                title,
                description,
                startDate,
                endDate,
                weeklyHours,
                about,
                image: postImageObject,
                owner: new mongoose.Types.ObjectId(userId),
            })
            // Responder com uma mensagem de sucesso e informações do post criado
            return res.status(200).json({
                'message': 'Post Criado!',
                'postId': `${newPost._id}`,
                'postName': `${newPost.title}`
            })

        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0206 - Error: ${err.message}` })
        }
    }

    // Método para atualizar um post
    static async updatePost(req, res) {
        try {
            // Obter o ID do post a partir dos parâmetros da requisição
            const { postId } = req.params
            // Verificar se o ID do post foi fornecido
            if (!postId) {
                return res.status(400).json({ 'message': 'COD 0207 - Insira um ID para alteração' })
            }
            // Encontrar o post com o ID fornecido e excluir a imagem
            const post = await Post.findOne({ _id: postId }).exec()
            // Se o post não for encontrado, responder com um erro 404 (Não Encontrado)
            if (!post) {
                return res.status(404).json({ 'message': `COD 0208 - Nenhum post encontrado com o ID ${postId}` })
            }
            // Verificar se foram fornecidos novos dados para o post e atualizá-los
            if (req.body?.title) post.title = req.body.title
            if (req.body?.description) post.description = req.body.description
            if (req.body?.about) post.about = req.body.about
            if (req.body?.startDate) post.startDate = req.body.startDate
            if (req.body?.endDate) post.endDate = req.body.endDate
            if (req.body?.weeklyHours) post.weeklyHours = req.body.weeklyHours
            // Salvar as alterações no post
            const result = await post.save()
            // Responder com as informações do post atualizado
            res.status(200).json({ result })
        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0209 - Error: ${err.message}` })
        }
    }

    // Método para excluir um post
    static async deletePost(req, res) {
        try {
            // Obter o ID do post a ser excluído a partir dos parâmetros da requisição
            const { postId } = req.params
            // Verificar se o ID do post foi fornecido
            if (!postId) {
                return res.status(400).json({ 'message': 'COD 0210 - Insira um ID para deletar' })
            }
            // Encontrar o post com o ID fornecido
            const post = await Post.findOne({ _id: postId })
            // Se o post não for encontrado, responder com um erro 404 (Não Encontrado)
            if (!post) {
                return res.status(404).json({ 'message': `COD 0211 - Post ${postId} não encontrado!` })
            }
            // Excluir o post do banco de dados
            await Post.deleteOne({ _id: postId })
            // Responder com uma mensagem de sucesso
            return res.status(200).json({ 'message': `Post ${postId} excluído!` })
        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0212 - Error: ${err.message}` })
        }
    }

    // Método para obter a lista de voluntários de um post
    static async getPostVolunteers(req, res) {
        try {
            // Obter o ID do post a partir dos parâmetros da requisição
            const { postId } = req.params
            // Verificar se o ID do post foi fornecido
            if (!postId) return res.status(400).json({ 'message': 'COD 0213 - Insira um ID para continuar' })
            // Encontrar o post com o ID fornecido e excluir a imagem
            const post = await Post.findOne({ _id: postId }).exec()
            // Se o post não for encontrado, responder com um erro 404 (Não Encontrado)
            if (!post) return res.status(404).json({ 'message': 'COD 0214 - No post with this ID' })
            // Se o post tiver voluntários e a lista não estiver vazia
            if (post.volunteers && post.volunteers.length > 0) {
                // Mapear os IDs dos voluntários para encontrar seus perfis
                const userObjects = await Promise.all(
                    post.volunteers.map(async (volunteerId) => {
                        const postFound = await User.findOne({ _id: volunteerId })
                        return postFound
                    })
                )
                // Responder com a lista de voluntários
                return res.status(200).json({ 'postVolunteers': userObjects })
            } else {
                return res.status(200).json({ 'postVolunteers': [] }) // Retorna uma lista vazia de voluntários caso não haja
            }
        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0218 - ${err.message}` })
        }
    }

    // Método para encerrar um post
    static async endPost(req, res) {
        try {
            // Obter o ID do post a partir dos parâmetros da requisição
            const { postId } = req.params
            // Verificar se o ID do post foi fornecido
            if (!postId) return res.status(400).json({ 'message': 'COD 0219 - Insira um ID para continuar' })
            // Encontrar o post com o ID fornecido
            const post = await Post.findOne({ _id: postId })
            // Se o post não for encontrado, responder com um erro 404 (Não Encontrado)
            if (!post) return res.status(404).json({ 'message': 'COD 0220 - No post with this ID' })

            post.isClosed = true
            post.save()
            // Responder com o post atualizado
            return res.status(200).json({ 'updatedPost': post })
        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0224 - ${err.message}` })
        }
    }

    // Método para pesquisar posts por nome
    static async searchPostByName(req, res) {
        const search = req.query.search;
        if (!search) return res.redirect('/post/');
        try {
            // Criar uma expressão regular para realizar a pesquisa sem diferenciar maiúsculas e minúsculas
            const regex = new RegExp(search, 'i');
            // Encontrar posts que correspondam ao título pesquisado e excluir a imagem
            const posts = await Post.find({ title: { $regex: regex } }).exec();
            // Responder com a lista de posts encontrados
            return res.status(200).json(posts);
        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0225 - ${err.message}` });
        }
    }

    static async getApprovedPosts(req,res){
        try{
            const posts = await Post.find({status: 'approved', isClosed:false}).exec()
            
            res.status(200).json({posts: posts})
        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }
}
