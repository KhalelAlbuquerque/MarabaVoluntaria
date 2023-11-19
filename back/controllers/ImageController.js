import Image from "../models/Image.js";

export default class ImageController{

    static async getImage(req,res){
        try{
            const {imageId} = req.params

            const image = await Image.find({_id:imageId}).exec()

            return res.json({image: image[0].image})
        }catch(err){
            console.log(err.message)
        }
    }

    static async createImage(req,res){
        try{
            const {image64} = req.body
            const newImg = await Image.create({image: image64})
            console.log

            return res.json({id:newImg._id})
        }catch(e){
            console.log(e)
        }
    }

    static async updateImage(req,res){
        try{
            const {imageId} = req.params
            const {image64} = req.body

            const image = await Image.find({_id:imageId}).exec()

            image.image = image64

            image.save()

            return res.json({image: image})
        }catch(e){
            console.log(e)
        }
    }

}