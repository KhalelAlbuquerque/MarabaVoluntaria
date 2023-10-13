import jwt from 'jsonwebtoken'
import findRefreshToken from './findRefreshToken.js'
import generateAccessToken from './genAccessToken.js'

const checkIfLogged = async function(req,res,next){
    try{
        const authHeader = await req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(token==null) return res.status(400).json({'message': "Insira o token de auth"})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user)=>{
            if(err) {
                let infos
                try{
                    infos = await jwt.decode(token)
                }catch(err){
                    return res.status(500).json({'message':'invalid token'})
                }
                const refreshToken = infos.refreshToken
                const hasRefresh = await findRefreshToken(refreshToken)

                if(!hasRefresh) return res.status(401).json({'message': 'Refresh token invalido, faca login'})

                const newTokenInfo = {
                    id:infos.id,
                    role: infos.role,
                    refreshToken: infos.refreshToken
                }
                // setar no cookie
                let newToken = await generateAccessToken(newTokenInfo)
                
                // req.cookie = newToken
                req.headers.authorization=`Bearer ${newToken}`
                console.log('\nNOVO TOKEN SETADO -> '+ newToken)
            }

            req.user = user

            next()
        })
    }catch(err){
        return res.status(500).json(err.message)
    }
}

export default checkIfLogged