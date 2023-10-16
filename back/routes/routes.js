import express from 'express'
import postRoutes from './routesPaths/postRoutes.js'
import authRoutes from './routesPaths/authRoutes.js'
import userRoutes from './routesPaths/userRoutes.js'

import PostController from '../controllers/PostController.js'

const router = express.Router()

router.use('/post', postRoutes)
router.use('/user', userRoutes)
router.use('/auth', authRoutes)
router.get('/', PostController.getAllPosts)

export default router