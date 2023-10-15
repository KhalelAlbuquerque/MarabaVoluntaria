import express from "express"
import UserController from "../controllers/UserController.js"
import checkIfLogged from '../middlewares/checkIfLogged.js'

const router = express.Router()

// essa rota ja esta no index.js
// router.get('/',  checkIfLogged, UserController.getAllUsers)
router.get('/:id', UserController.getUser)
router.post('/registrar', UserController.createUser)
router.put('/editar', UserController.updateUser)
router.delete('/delete', UserController.deleteUser)
router.post('/apply/:postId', checkIfLogged, UserController.applyToPost)
router.post('/unapply/:postId', checkIfLogged, UserController.unapplyFromPost)
router.post('/userInscriptions', UserController.getUserInscriptions)


export default router