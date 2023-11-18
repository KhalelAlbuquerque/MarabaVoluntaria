import Image from "../models/Image.js";

export default class ImageController{

    static async getImage(req,res){
        const {imageId} = req.params

        const image = await Image.find({_id:imageId}).exec()

        return res.json({image: image[0].image})
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

}