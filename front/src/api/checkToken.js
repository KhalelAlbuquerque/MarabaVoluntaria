import { cookies } from "next/headers";


// funcao teste de ver o cookie
export default function checkLogin(){

    const cookie = cookies()
    const token = cookie.get('teste')

    if(!token) return false
    return true
}