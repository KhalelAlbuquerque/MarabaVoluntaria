import User from "../models/User.js"

export default async function(req, res, next) {
    try{
        const userObject = await User.findOne({_id: req.user.id}).exec()

        if(userObject.cnpj == "0" || !userObject.cnpj) return res.status(400).json({'message': 'COD 9995 - Apenas ongs podem acessar essa rota!'})

        next()
    }catch(err){
        return res.status(400).json({'message':`COD 9996 - ${err.message}`})
    }
}