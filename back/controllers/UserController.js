// Importar os modelos e bibliotecas necessárias
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import path from 'path'
import fs from 'fs/promises'
import jwt from 'jsonwebtoken'
import Post from '../models/Post.js'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import generateAccessToken from '../helpers/genAccessToken.js'
import Image from '../models/Image.js'

// Determinar o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Definir a classe do controlador de usuário
export default class UserController {

    // Método para obter todos os usuários
    static async getAllUsers(req, res) {
        try {
            // Buscar todos os usuários, excluindo a foto e a senha
            const allUsers = await User.find().select('-password').exec()
            // Se nenhum usuário for encontrado, responder com uma lista vazia
            if (!allUsers) {
                return res.status(200).json({ 'users': [] })
            }
            // Responder com a lista de usuários
            return res.status(200).json({ 'users': allUsers.reverse() })
        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0301 - Error: ${err.message}` })
        }
    }

    // Método para obter um usuário por ID
    static async getUser(req, res) {
        try {
            // Buscar um usuário pelo ID, excluindo a senha
            const user = await User.findOne({ _id: req.params.userId }).select('-password').exec()
            // Se nenhum usuário for encontrado, responder com um erro 404 (Não Encontrado)
            if (!user) {
                return res.status(404).json({ 'message': 'COD 0302 - Usuário não encontrado' })
            }
            // Responder com as informações do usuário
            return res.status(200).json({ 'user': user })
        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0303 - Error: ${err.message}` })
        }
    }

    // Método para criar um novo usuário
    static async createUser(req, res) {
        try {
            // Extrair dados do corpo da solicitação
            let { name, email, role, phoneNumber, password, image } = req.body
            let profPicObject
            // Se não houver arquivo de imagem na solicitação, carregar uma imagem padrão
            if (!image) {
                const filePath = path.join(__dirname, '..', 'public', 'pfp64.txt')
                const imageBase64 = await fs.readFile(filePath, 'utf-8')
                let imageObject = await Image.create({image: imageBase64})
                profPicObject = await imageObject
            } else {
                profPicObject = image
            }
            // Verificar se o usuário com o mesmo email já existe

            if (await User.findOne({ email: email }).exec()) {
                return res.status(405).json({ message: 'COD 0304 - Usuário já existe' })
            }
            const salt = process.env.SALT
            // Criptografar a senha fornecida
            const hashedPassword = await bcrypt.hash(password, salt)
            // Criar um novo usuário com os dados fornecidos
            const newUser = await User.create({
                name,
                email,
                phoneNumber,
                role,
                password: hashedPassword,
                profPicture: profPicObject
            })
            // Gerar um token de acesso com informações do novo usuário
            const AccessToken = generateAccessToken({
                id: newUser._id,
                role: newUser.role,
            })
            // Responder com informações do usuário e o token de acesso
            return res.status(200).json({
                'message': 'User Registrado!',
                'userId': `${newUser._id}`,
                'userName': `${newUser.name}`,
                'accessToken': `${AccessToken}`,
            })
        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0306 - Error: ${err.message}` })
        }
    }

    // Método para atualizar informações de um usuário
    static async updateUser(req, res) {
        try {
            // Obter o ID do usuário a ser atualizado a partir das informações de autenticação
            const userId = req.userInfo.id
            // Encontrar o usuário com o ID fornecido
            const user = await User.findOne({ _id: userId }).exec()
            // Se nenhum usuário for encontrado, responder com um erro 404 (Não Encontrado)
            if (!user) {
                return res.status(404).json({ 'message': `COD 0308 - Nenhum usuário encontrado com o id ${userId}` })
            }
            // Atualizar informações do usuário com base nas informações fornecidas na solicitação
            if (req.body?.name) user.name = req.body.name
            if (req.body?.email) user.email = req.body.email
            if (req.body?.phoneNumber) user.phoneNumber = req.body.phoneNumber
            // Salvar as alterações
            const result = await user.save()
            // Responder com uma mensagem de sucesso e os novos dados
            res.status(200).json({ 'message': { 'newData': result } })
        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0309 - Error: ${err.message}` })
        }
    }

    // Método para excluir um usuário
    static async deleteUser(req, res) {
        try {
            // Obter o ID do usuário a ser excluído a partir das informações de autenticação
            const userId = req.userInfo.id
            // Encontrar o usuário com o ID fornecido
            const user = await User.findOne({ _id: userId })
            // Se nenhum usuário for encontrado, responder com um erro 404 (Não Encontrado)
            if (!user) {
                return res.status(404).json({ 'message': `COD 0311 - User ${userId} não encontrado!` })
            }
            // Excluir o usuário
            await User.deleteOne({ _id: userId })
            // Responder com uma mensagem de sucesso
            return res.status(200).json({ 'message': `User ${userId} excluído!` })
        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({'message':`COD 0312 - Error: ${err.message}`})
        }
    }

    // Método para inscrever um usuário em uma postagem
    static async applyToPost(req, res) {
        try {
            let { postId } = req.params
            // Verificar se o ID da postagem é fornecido
            if (!postId) return res.status(400).json({ 'message': 'COD 0313 - Insira um ID para continuar' })
            // Obter o ID do usuário a partir das informações de autenticação
            const userId = req.userInfo.id
            // Encontrar a postagem com o ID fornecido
            const post = await Post.findOne({ _id: postId })
            // Se a postagem não for encontrada, responder com um erro 404 (Não Encontrado)
            if (!post) return res.status(404).json({ 'message': "COD 0316 - Post not found" })
            // Verificar se o usuário já está inscrito na postagem
            if ((post.volunteers).includes(userId)) {
                return res.status(405).json({ 'message': `COD 0317 - Usuario ${userId} já é cadastrado no post ${post._id}` })
            }
            // Atualizar o usuário com a inscrição na postagem
            await User.findOneAndUpdate(
                { _id: userId },
                { $push: { postInscriptions: post._id } },
                { new: true },
            )
            // Atualizar a postagem com o ID do usuário inscrito
            await Post.findOneAndUpdate(
                { _id: post._id },
                { $push: { volunteers: userId } },
                { new: true },
            )
            // Responder com uma mensagem de sucesso
            return res.status(200).json({ 'message': `User ${userId} foi inscrito no post -> ${post._id}` })
        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({'message':`COD 0318 - Error: ${err.message}`})
        }
    }

    // Método para cancelar a inscrição de um usuário em uma postagem
    static async unapplyFromPost(req, res) {
        try {
            const { postId } = req.params
            // Verificar se o ID da postagem é fornecido
            if (!postId) return res.status(400).json({ 'message': 'COD 0319 - Insira um ID para continuar' })
            // Obter o ID do usuário a partir das informações de autenticação
            const userId = req.userInfo.id
            // Encontrar a postagem com o ID fornecido
            const post = await Post.findOne({ _id: postId })
            // Se a postagem não for encontrada, responder com um erro 404 (Não Encontrado)
            if (!post) return res.status(404).json({ 'message': "COD 0322 - Post not found" })
            // Verificar se o usuário está inscrito na postagem antes de cancelar a inscrição
            if (!(post.volunteers).includes(userId)) {
                return res.status(405).json({ 'message': `COD 0323 - Usuario ${userId} não é cadastrado no post ${post._id}, impossível desinscrever` })
            }
            // Atualizar o usuário removendo a inscrição na postagem
            await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { postInscriptions: post._id } },
                { new: true },
            )
            // Atualizar a postagem removendo o ID do usuário inscrito
            await Post.findOneAndUpdate(
                { _id: post._id },
                { $pull: { volunteers: userId } },
                { new: true },
            )
            // Responder com uma mensagem de sucesso
            return res.status(200).json({ 'message': `User ${userId} retirado de voluntario no post -> ${post._id}` })
        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({'message':`COD 0324 - Error: ${err.message}`})
        }
    }

    // Método para obter as inscrições de um usuário em postagens
    static async getUserInscriptions(req, res) {
        try {
            let postObjects = []
            // Obter o ID do usuário para o qual deseja-se listar as inscrições
            const userId = req.params.userId
            // Encontrar o usuário com o ID fornecido
            const user = await User.findOne({ _id: userId })
            // Se nenhum usuário for encontrado, responder com um erro 404 (Não Encontrado)
            if (!user) return res.status(404).json({ 'message': "No user with this id" })
            // Se o usuário tiver inscrições em postagens, recuperar informações dessas postagens
            if (user.postInscriptions) {
                await user.postInscriptions.forEach(async (post) => {
                    const postFound = await Post.find({ _id: post._id })
                    if (postFound) postObjects.push(postFound)
                })
            }
            // Responder com as inscrições do usuário
            return res.status(200).json({ 'userInscriptions': user.postInscriptions })
        } catch (err) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({'message':`COD 0327 - Error: ${err.message}`})
        }
    }
}

            //
