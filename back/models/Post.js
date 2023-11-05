import mongoose from 'mongoose'
const Schema = mongoose.Schema

const postSchema = mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        default: '',
    },
    about:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    weeklyHours:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    isClosed:{
        type: Boolean,
        default: false
    },
    status:{
        default: "pending",
        type: String
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    volunteers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

})

const Post = mongoose.model('Post', postSchema)

export default Post