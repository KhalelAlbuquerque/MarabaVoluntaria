import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import conn from "./db/conn.js"

import routes from './routes/routes.js'

import PostController from './controllers/PostController.js'
import checkIfLogged from './middlewares/checkIfLogged.js'

import swaggerUi from "swagger-ui-express"
import swaggerDocs from './swagger.json' assert {type: 'json'}

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.static('public'))


app.use('/',routes)

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