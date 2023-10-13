import User from "../models/User.js"
import jwt from 'jsonwebtoken'

export default async function findUserByToken(accessToken){

    let userData
    
    await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, result)=>{
        if(result) userData = result
    })

    if (!userData) return {isTokenValid: false, message:'invalid token'}

    const user = await User.findOne({_id: userData.id})

    if(!user) return {isTokenValid: false, message:'no user found in token'}    

    return {isTokenValid: true, user: user}
    

}