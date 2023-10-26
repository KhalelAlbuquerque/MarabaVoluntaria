import AuthController from "../../controllers/AuthController.js";
import express from 'express'

const router = express.Router();

router.post('/user/login', AuthController.userLogin)
router.post('/ong/login', AuthController.ongLogin)
router.get('/logout', AuthController.logout)

export default router