import express from "express"
import UserController from "../controllers/UserController.js"

const router = express.Router()

router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getUser)
router.post('/registrar', UserController.createUser)
router.put('/editar', UserController.updateUser)
router.delete('/delete', UserController.deleteUser)


export default router