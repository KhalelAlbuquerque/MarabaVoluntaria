import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({

    providers:[
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type:'text', placeholder: 'khalel@g.c'},
                password: { label: 'senha', type:'password', placeholder: '*****'}
            },
            async authorize(credentials, req){
                const user = {id: 1, fullname: 'khalel', email: 'khalelzinho@gmail.com'}
                return user
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
    }

})



export {handler as GET, handler as POST}