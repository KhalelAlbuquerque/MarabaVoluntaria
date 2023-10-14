import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    cnpj: {
        type: String,
        default: '0'
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type: Number,
        default: 2001
        // Ong code 2002 
        // Admin code 2003
    },
    profPicture: String,
    postInscriptions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
})



export default mongoose.model("User", userSchema)