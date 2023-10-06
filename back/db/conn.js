import mongoose from 'mongoose';

export const conn = async ()=>{

    try{
        const database_url = process.env.DATABASE_URL

        await mongoose.connect(database_url,{
            useUnifiedTopology: true,
            useNewUrlParser:true
        })

    }catch(err){
        console.error(err.message)
    }

}
