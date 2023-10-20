'use strict'

import { cookies } from "next/headers";

// funcao teste de ver o cookie
export default function checkLogin(){

    const cookie = cookies()
    const token = cookie.get('token')

    if(!token) return false

    return true
}