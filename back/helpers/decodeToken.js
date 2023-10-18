import jwt from 'jsonwebtoken'

export default function decodeToken(token){

    try{
        return jwt.decode(token)
    }catch(err){
        return {'message': err.message}
    }

}