import jwt from 'jsonwebtoken'

const checkIfLogged = async function(req,res,next){
    try{
        // Pega o header de autorização, que vem "Bearer TOKEN"
        const authHeader = await req.headers['authorization']
        // Separa ele e pega só a parte do token
        const token = await authHeader && authHeader.split(' ')[1]
        
        // Caso não tenha passado token
        if(token==null || token==undefined) return res.status(400).json({'message': "COD 9992 - Insira o token de auth"})

        // Checa se o token é valido
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user)=>{
            if(err) {
                return res.status(400).json({'message': 'COD 9993 - invalid token, please login'})
            }

            // Caso seja, ele seta as informações do usuário na requisição, e a rota consegue acessar ele
            req.userInfo = user
            req.token = token
            next()
        })
    }catch(err){
        return res.status(500).json({'message': `COD 9994 - ${err.message}`})
    }
}

export default checkIfLogged