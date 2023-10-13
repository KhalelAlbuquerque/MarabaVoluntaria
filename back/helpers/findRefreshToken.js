import RefreshToken from '../models/RefreshToken.js'

const findRefreshToken = async  (token)=>{

    const refreshToken = token
    if(refreshToken == null) return false

    const isRefreshToken = await RefreshToken.findOne({ token: refreshToken})

    if(!isRefreshToken) return false

    return true

}

export default findRefreshToken