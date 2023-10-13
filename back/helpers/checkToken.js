import jwt from 'jsonwebtoken'

const checkToken = function(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token==null) return res.status(400).json({'message': "Insira o token de auth"})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.status(403).json({'message': "Faça o login para continuar"})

        req.user = user

        next()
    })
}

export default checkToken