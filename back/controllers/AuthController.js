// Importar os modelos de usuário e ONG
import User from "../models/User.js"
import Ong from "../models/Ong.js"

// Importar bibliotecas para criptografia e geração de tokens JWT
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Importar uma função para gerar tokens de acesso
import generateAccessToken from "../helpers/genAccessToken.js"

// Definir a classe do controlador de autenticação
export default class AuthController {

    // Método para autenticar um usuário
    static async userLogin(req, res) {
        try {
            // Extrair o email e a senha da solicitação
            const { email, password } = req.body
            // Procurar um usuário com o email fornecido
            const user = await User.findOne({ email: email }).select('+password')
            // Se um usuário for encontrado
            if (user) {
                // Verificar se a senha fornecida corresponde à senha no banco de dados
                const matchPass = await bcrypt.compare(password, user.password)
                // Se as senhas não corresponderem, retorne um erro 401 (Não Autorizado)
                if (!matchPass) return res.status(401).json({ message: 'Credenciais inválidas' })
                // Gerar um token de acesso com informações do usuário
                const AccessToken = generateAccessToken({
                    id: user._id,
                    role: user.role,
                })
                // Responder com informações do usuário e o token de acesso
                return res.status(200).json({
                    'message': 'User Logado!',
                    'userId': `${user._id}`,
                    'userName': `${user.name}`,
                    'userImg': `${user.profPicture}`,
                    'accessToken': `${AccessToken}`,
                    'role': `${user.role}`
                })
            }
            // Se nenhum usuário for encontrado com o email, verificar se é uma ONG
            const ong = await Ong.findOne({ email: email })
            // Se for uma ONG, retorne uma mensagem apropriada
            if (ong) {
                return res.status(400).json({ 'message': "Email cadastrado como Ong" })
            }
            // Se nenhum usuário ou ONG for encontrado, retorne um erro 404 (Não Encontrado)
            return res.status(404).json({ message: 'Credenciais inválidas' })
        } catch (err) {
            // Em caso de erro, retorne um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0103 - Error: ${err.message}` })
        }
    }

    // Método para autenticar uma ONG
    static async ongLogin(req, res) {
        try {
            // Extrair o email e a senha da solicitação
            const { email, password } = req.body
            // Procurar uma ONG com o email fornecido
            const ong = await Ong.findOne({ email: email }).select('+password')
            // Se uma ONG for encontrada
            if (ong) {
                // Verificar se a senha fornecida corresponde à senha no banco de dados
                const matchPass = await bcrypt.compare(password, ong.password)
                // Se as senhas não corresponderem, retorne um erro 401 (Não Autorizado)
                if (!matchPass) return res.status(401).json({ message: 'Credenciais inválidas' })
                // Gerar um token de acesso com informações da ONG
                const AccessToken = generateAccessToken({
                    id: ong._id,
                    role: ong.role,
                })
                // Responder com informações da ONG e o token de acesso
                return res.status(200).json({
                    'message': 'ONG Logada!',
                    'ongId': `${ong._id}`,
                    'ongName': `${ong.name}`,
                    'ongImg': `${ong.profPicture}`,
                    'accessToken': `${AccessToken}`
                })
            }
            // Se nenhuma ONG for encontrada com o email, verificar se é um usuário
            const user = await User.findOne({ email: email })
            // Se for um usuário, retorne uma mensagem apropriada
            if (user) {
                return res.status(400).json({ 'message': "Email cadastrado como usuário" })
            }
            // Se nenhuma ONG ou usuário for encontrado, retorne um erro 404 (Não Encontrado)
            return res.status(404).json({ message: 'Credenciais inválidas' })

        } catch (err) {
            // Em caso de erro, retorne um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0103 - Error: ${err.message}` })
        }
    }

    // Método para deslogar um usuário
    static async logout(req, res) {
        try {
            // Obter o token de autorização dos cabeçalhos da solicitação
            let header = await req.headers['authorization']
            // Gerar um novo token com uma mensagem indicando que o usuário está deslogado
            const newToken = await jwt.sign({ text: "You are logged out" }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1 })
            // Atualizar o cabeçalho com o novo token
            header = `Bearer ${newToken}`
            // Armazenar o novo token no cliente (talvez por meio de localStorage)
            localStorage.setItem('token', newToken)
            // Responder com uma mensagem de sucesso
            res.status(200).json({ "message": "User deslogado!" })
        } catch (err) {
            // Em caso de erro, retorne um erro 500 (Erro Interno do Servidor) com uma mensagem
            return res.status(500).json({ 'message': `COD 0104 - ${err.message}` })
        }
    }
}
