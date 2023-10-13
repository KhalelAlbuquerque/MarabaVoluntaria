import express from "express"
import UserController from "../controllers/UserController.js"
import checkToken from '../helpers/checkToken.js'

const router = express.Router()

router.get('/',  checkToken, UserController.getAllUsers)
router.get('/:id', UserController.getUser)
router.post('/registrar', UserController.createUser)
router.put('/editar', UserController.updateUser)
router.delete('/delete', UserController.deleteUser)


export default router