import mongoose from 'mongoose'
const Schema = mongoose.Schema

const refTokenSchema = mongoose.Schema({

    token:{
        type: String,
        required: true
    },

})



// quando for logar, fazer a verificacao no banco de dados de tokens e ver se tem algum que resolvido tenha os dados do usuarios nele, caso tenha, user logado
// caso nao tiver nenhum retornando o id dele, quer dizer q n ta logado e nem pode receber o access token novo...
const RefreshToken = mongoose.model('RefreshToken', refTokenSchema)

export default RefreshToken