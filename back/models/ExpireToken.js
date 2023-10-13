import mongoose from 'mongoose'
const Schema = mongoose.Schema

const refTokenSchema = mongoose.Schema({

    token:{
        type: String,
        required: true
    },

})

const RefreshToken = mongoose.model('RefreshToken', refTokenSchema)

export default RefreshToken