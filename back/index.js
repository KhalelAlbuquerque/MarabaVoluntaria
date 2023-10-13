import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import conn from "./db/conn.js"

import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import authRoutes from './routes/authRoutes.js'

import PostController from './controllers/PostController.js'


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


app.use('/posts', postRoutes)
app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.get('/', PostController.getAllPosts)

conn()
mongoose.connection.once('open', ()=>{
    console.log("Conexão feita")
    
    const PORT = process.env.PORT || 3001

    app.listen(PORT, ()=>{
        console.log(`Servidor local rodando na porta ${PORT}`)
    })
})

// app.listen()
// conn.sync().then().catch()