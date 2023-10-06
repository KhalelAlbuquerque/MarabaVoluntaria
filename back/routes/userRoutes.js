import express from "express"
import UserController from "../controllers/UserController.js"

const router = express.Router()


router.post('/registrar', UserController.createUser)
router.put('/editar', UserController.updateUser)


export default router