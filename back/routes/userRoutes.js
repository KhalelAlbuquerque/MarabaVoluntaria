import express from "express"
import UserController from "../controllers/UserController.js"
import checkIfLogged from '../helpers/checkIfLogged.js'

const router = express.Router()

router.get('/',  checkIfLogged, UserController.getAllUsers)
router.get('/:id', UserController.getUser)
router.post('/registrar', UserController.createUser)
router.put('/editar', UserController.updateUser)
router.delete('/delete', UserController.deleteUser)
router.post('/candidate/:postId', checkIfLogged, UserController.candidateToPost)


export default router