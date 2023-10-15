import jwt from 'jsonwebtoken'

const checkIfLogged = async function(req,res,next){
    try{
        const authHeader = await req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(token==null || token==undefined) return res.status(400).json({'message': "COD 9992 - Insira o token de auth"})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user)=>{
            if(err) {
                return res.status(400).json({'message': 'COD 9993 - invalid token, please login'})
            }

            req.user = user

            next()
        })
    }catch(err){
        return res.status(500).json({'message': `COD 9994 - ${err.message}`})
    }
}

export default checkIfLogged