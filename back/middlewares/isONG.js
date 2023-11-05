import Ong from "../models/Ong.js"

export default async function(req, res, next) {
    try{
        // Busca uma ong com o id passado na requisicao
        const OngObject = await Ong.findOne({_id: req.userInfo.id}).exec()

        // Caso não tenha role ou não seja ong é barrado
        if(OngObject.role !== 'Ong' || !OngObject.role) return res.status(400).json({'message': 'COD 9995 - Apenas ongs podem acessar essa rota!'})

        // Caso seja ong, next
        next()
    }catch(err){
        return res.status(400).json({'message':`COD 9996 - ${err.message}`})
    }
}