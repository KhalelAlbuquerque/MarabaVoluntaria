import User from "../models/User.js"

export default async function(req, res, next) {
    try{
        const AdminObject = await User.findOne({_id: req.userInfo.id}).exec()

        if(!AdminObject) return res.status(400).json({'message': "Ongs não podem acessar rotas de admins"})


        if(AdminObject.role !== 'Admin' || !AdminObject.role) return res.status(400).json({'message': 'COD 9995 - Apenas admins podem acessar essa rota!'})

        next()
    }catch(err){
        return res.status(400).json({'message':`COD 9996 - ${err.message}`})
    }
}