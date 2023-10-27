import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import request from "@/helpers/request"
import Notification from "@/components/Notifier/Notification"

const handler = NextAuth({

    providers:[
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type:'text', placeholder: 'khalel@g.c'},
                password: { label: 'senha', type:'password', placeholder: '*****'}
            },
            async authorize(credentials, req){
                const email = credentials.email
                const password = credentials.password
                const userType = credentials.userType
                console.log(userType)
                // const userType = credentials.userType

                if(userType === 'user'){
                    const requisicao = await request('auth/user/login', "POST", {email, password})

                    if(requisicao.ok){
                        const user = {
                            id: requisicao.userId,
                            accessToken: requisicao.accessToken,
                            name: requisicao.userName,
                            // picture: requisicao.userImg
                        }
                        return user
                    }else{
                        if(requisicao.message === "Email cadastrado como Ong"){
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
                            // picture: requisicao.ongImg
                        }
                        return user
                    }else{
                        console.log(requisicao)
                        if(requisicao.message === "Email cadastrado como usuário"){
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
            return token
        },
        session({session,token}){
            session.user = token.user

            return session
        }
    },
    pages:{
        signIn: ['/login', '/login_ong']
    }

})



export {handler as GET, handler as POST}