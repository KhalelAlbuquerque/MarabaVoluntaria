import express from "express"
import UserController from "../../controllers/UserController.js"
import checkIfLogged from '../../middlewares/checkIfLogged.js'

const router = express.Router()

router.get('/', UserController.getAllUsers)
router.get('/user/:userId', UserController.getUser)
router.post('/registrar', UserController.createUser)
router.put('/editar', checkIfLogged, UserController.updateUser)
router.delete('/delete/:userId', checkIfLogged,UserController.deleteUser)
router.post('/apply/:postId', checkIfLogged, UserController.applyToPost)
router.post('/unapply/:postId', checkIfLogged, UserController.unapplyFromPost)
router.post('/userInscriptions/:userId', UserController.getUserInscriptions)


export default router 