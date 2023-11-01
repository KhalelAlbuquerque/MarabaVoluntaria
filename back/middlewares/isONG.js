import Ong from "../models/Ong.js"

export default async function(req, res, next) {
    try{
        const OngObject = await Ong.findOne({_id: req.userInfo.id}).exec()

        if(OngObject.role !== 'Ong' || !OngObject.role) return res.status(400).json({'message': 'COD 9995 - Apenas ongs podem acessar essa rota!'})

        next()
    }catch(err){
        return res.status(400).json({'message':`COD 9996 - ${err.message}`})
    }
}