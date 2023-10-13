import AuthController from "../controllers/AuthController.js";
import express from 'express'

const router = express.Router();

router.post('/login', AuthController.login)

export default router