import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ImageSchema = new Schema({
    image: String
})


export default mongoose.model("Image", ImageSchema)