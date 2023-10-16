import express from "express"
import UserController from "../../controllers/UserController.js"
import checkIfLogged from '../../middlewares/checkIfLogged.js'

const router = express.Router()

router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getUser)
router.post('/registrar', UserController.createUser)
router.put('/editar/:userId', UserController.updateUser)
router.delete('/delete/:userId', UserController.deleteUser)
router.post('/apply/:postId', checkIfLogged, UserController.applyToPost)
router.post('/unapply/:postId', checkIfLogged, UserController.unapplyFromPost)
router.post('/userInscriptions', UserController.getUserInscriptions)


export default router 