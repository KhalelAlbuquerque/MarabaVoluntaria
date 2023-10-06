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
    cnpj: String,
    password:{
        type:String,
        required: true
    },
    role:{
        User:{
            type: Number,
            default: 2001
        },
        Ong: Number,
        Admin: Number
    },
    refreshToken: String
})

module.exports = mongoose.model("User", userSchema)