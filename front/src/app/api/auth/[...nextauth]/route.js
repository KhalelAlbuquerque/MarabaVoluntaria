import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import request from "@/helpers/request"
import Notification from "@/components/Notifier/Notification"

const handler = NextAuth({

    providers:[
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'e-mail', type:'text', placeholder: 'email@email.com'},
                password: { label: 'password', type:'password', placeholder: '********'}
            },
            async authorize(credentials, req){
                const email = credentials.email
                const password = credentials.password
                const userType = credentials.userType
                // const userType = credentials.userType

                if(userType === 'user'){
                    const requisicao = await request('auth/user/login', "POST", {email, password})

                    if(requisicao.ok){
                        const user = {
                            id: requisicao.userId,
                            accessToken: requisicao.accessToken,
                            name: requisicao.userName,
                            role : requisicao.role,
                            // picture: requisicao.userImg
                        }
                        return user
                    }else{
                        if(requisicao.errorType === "WrongRole"){
                            throw new Error(requisicao.message)
                        }
                        throw new Error("Credenciais inválidas")
                    }
                }

                if(userType === 'ong'){
                    const requisicao = await request('auth/ong/login', "POST", {email, password})

                    if(requisicao.ok){
                        const user = {
                            id: requisicao.ongId,
                            accessToken: requisicao.accessToken,
                            name: requisicao.ongName,
                            role : 'Ong'
                            // picture: requisicao.ongImg
                        }
                        return user
                    }else{
                        if(requisicao.errorType === "WrongRole"){
                            throw new Error(requisicao.message)
                        }
                        throw new Error("Credenciais inválidas")
                    }
                }
            }
        })
    ],
    callbacks: {
        jwt({user, token}){
            if(user) token.user=user
            // token.exp = Date.now()+(30*1000)
            // console.log('----------------------------------------------')
            // console.log(token)
            // 60 segundos = Date.now()+(60*1000)

            return token
        },
        session({session,token}){
            session.user = token.user
            // session.expires = `${(new Date(token.exp)).toISOString()}`
            // console.log(session)
            return session
        }
    },
    pages:{
        signIn: ['/login', '/login_ong']
    }

})



export {handler as GET, handler as POST}