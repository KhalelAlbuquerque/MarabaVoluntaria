import AuthController from "../../controllers/AuthController.js";
import express from 'express'

const router = express.Router();

router.post('/login', AuthController.login)
router.get('/logout',AuthController.logout)

export default router