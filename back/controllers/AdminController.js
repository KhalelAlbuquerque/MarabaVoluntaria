import User from '../models/User.js'
import Post from '../models/Post.js'

export default class AdminController {

    // Método para aprovar um post
    static async approvePost(req, res) {
        try {
            // Obter o ID do post a partir dos parâmetros da requisição
            const { postId } = req.params
            // Encontrar o post com o ID fornecido e excluir a imagem
            const post = await Post.findOne({ _id: postId }).select('-image').exec()
            // Se o post não for encontrado, responder com um erro 404 (Não Encontrado)
            if (!post) return res.status(404).json({ 'message': "Post não encontrado!" })
            // Verificar se o status do post já é 'rejected'
            if (post.status === 'rejected') return res.status(400).json({ 'message': "Post já reprovado anteriormente!" })
            // Verificar se o status do post já é 'approved'
            if (post.status === 'approved') return res.status(400).json({ 'message': "Post já aprovado anteriormente!" })
            // Definir o status do post como 'approved' e salvar as alterações
            post.status = 'approved'
            await post.save()
            // Responder com uma mensagem de sucesso e o post atualizado
            return res.status(200).json({ 'message': 'Post aprovado!', post })
        } catch (e) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(200).json({ 'message': e.message })
        }
    }

    // Método para reprovar um post
    static async reprovePost(req, res) {
        try {
            // Obter o ID do post a partir dos parâmetros da requisição
            const { postId } = req.params
            // Encontrar o post com o ID fornecido e excluir a imagem
            const post = await Post.findOne({ _id: postId }).select('-image').exec()
            // Se o post não for encontrado, responder com um erro 404 (Não Encontrado)
            if (!post) return res.status(404).json({ 'message': "Post não encontrado!" })
            // Verificar se o status do post já é 'approved'
            if (post.status === 'approved') return res.status(400).json({ 'message': "Post já aprovado anteriormente!" })
            // Verificar se o status do post já é 'rejected'
            if (post.status === 'rejected') return res.status(400).json({ 'message': "Post já reprovado anteriormente!" })
            // Definir o status do post como 'rejected' e salvar as alterações
            post.status = 'rejected'
            await post.save()
            // Responder com uma mensagem de sucesso e o post atualizado
            return res.status(200).json({ 'message': 'Post recusado!', post })
        } catch (e) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(200).json({ 'message': e.message })
        }
    }

    // Método para excluir um post
    static async deletePost(req, res) {
        try {
            // Obter o ID do post a partir dos parâmetros da requisição
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

    // Método para obter a lista de posts pendentes de aprovação
    static async getPostsToApprove(req, res) {
        try {
            // Encontrar todos os posts com status 'pending' e excluir a imagem
            const posts = await Post.find({ status: 'pending' }).select('-image').exec()
            // Se não houver posts pendentes, responder com uma lista vazia
            if (!posts) return res.status(200).json({ "posts": [] })
            // Responder com a lista de posts pendentes
            return res.status(200).json({ 'posts': posts })
        } catch (e) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': e.message })
        }
    }

    // Método para obter um post pendente de aprovação
    static async getOnePostToApprove(req, res) {
        try {
            // Obter o ID do post a partir dos parâmetros da requisição
            const { postId } = req.params
            // Encontrar o post com o ID fornecido
            const post = await Post.find({ _id: postId }).exec()
            // Se o post não for encontrado, responder com uma mensagem de erro
            if (!post) return res.status(200).json({ 'message': 'Post não encontrado' })
            // Verificar se o status do post já é 'approved'
            if (post.status === 'approved') return res.status(200).json({ 'message': 'Esse post já foi aprovado anteriormente!' })
            // Verificar se o status do post já é 'reproved'
            if (post.status === 'reproved') return res.status(200).json({ 'message': 'Esse post já foi reprovado anteriormente!' })
            // Responder com o post pendente
            return res.status(200).json({ 'post': post })
        } catch (e) {
            // Em caso de erro, retornar um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': e.message })
        }
    }
}
