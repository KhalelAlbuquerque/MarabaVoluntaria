'use client'

import React, { createContext, useState} from 'react'

export const AuthContext = createContext()


export function AuthProvider({children}) {

    const [user,setUser] = useState(null)
    const [token,setToken] = useState(null)

    const SaveUser = (user,token) => {
        setUser(user)
        setToken(token)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{SaveUser, user, token, logout }}>
            {children}
        </AuthContext.Provider>
    )
}