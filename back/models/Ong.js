import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ongSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    about:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phoneNumber: {
        type: String,
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
        type: String,
        default: 'Ong'
    },
    profPicture: String,
    postInscriptions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: []
    }]
})



export default mongoose.model("Ong", ongSchema)