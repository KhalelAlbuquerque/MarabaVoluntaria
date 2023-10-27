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
    phoneNumber: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true,
        select: false
    },
    role:{
        type: String,
        default: 'User'
        // User / Admin
    },
    profPicture: String,
    postInscriptions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: []
    }]
})



export default mongoose.model("User", userSchema)