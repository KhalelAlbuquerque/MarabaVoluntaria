import express from 'express';
import mongoose from 'mongoose';
import {conn} from './db/conn.js'
import dotenv from 'dotenv'
dotenv.config()


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))



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