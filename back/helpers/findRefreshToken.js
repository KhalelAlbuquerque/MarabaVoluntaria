import ExpireToken from '../models/ExpireToken.js'

const findRefreshToken = async  (token)=>{

    const refreshToken = token
    if(refreshToken == null) return false

    const isRefreshToken = await ExpireToken.findOne({ token: refreshToken})

    if(!isRefreshToken) return false

    return true

}

export default findRefreshToken