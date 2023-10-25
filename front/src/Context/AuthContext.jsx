'use client'

import React, { createContext, useState} from 'react'

export const AuthContext = createContext()


export function AuthProvider({children}) {

    const [user,setUser] = useState(null)
    const [token,setToken] = useState(null)
    const [ong,setOng] = useState(null)
    const [tokenOng, setTokenOng] = useState(null)
    const [img,setImg] = useState(null)

    const SaveUser = (user,token,img) => {
        setUser(user)
        setToken(token)
        setImg(img)
    }

    const SaveOng = (ong,tokenOng,img) => {
        setOng(ong)
        setTokenOng(tokenOng)
        setImg(img)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        setImg(null)
        setOng(null)
        setTokenOng(null)
    }

    return (
        <AuthContext.Provider value={{SaveUser, SaveOng, user, token, logout, ong, tokenOng, img}}>
            {children}
        </AuthContext.Provider>
    )
}