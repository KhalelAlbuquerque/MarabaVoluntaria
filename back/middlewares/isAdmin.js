import User from "../models/User.js"

export default async function(req, res, next) {
    try{
        // Busca um usuario com o id do user da requisicao
        const AdminObject = await User.findOne({_id: req.userInfo.id}).exec()

        // Se ele não achar na tabela de usuário, se sabe que é uma ong, e é barrada
        if(!AdminObject) return res.status(400).json({'message': "Ongs não podem acessar rotas de admins"})

        // Caso o usuario não tiver role ou a role não ser admin, ele é barrado
        if(AdminObject.role !== 'Admin' || !AdminObject.role) return res.status(400).json({'message': 'COD 9995 - Apenas admins podem acessar essa rota!'})

        // Caso for admin
        next()
    }catch(err){
        return res.status(400).json({'message':`COD 9996 - ${err.message}`})
    }
}