import express from 'express'
import postRoutes from './routesPaths/postRoutes.js'
import authRoutes from './routesPaths/authRoutes.js'
import userRoutes from './routesPaths/userRoutes.js'
import ongRoutes from './routesPaths/ongRoutes.js'
import adminRoutes from './routesPaths/adminRoutes.js'
import imageRoutes from './routesPaths/imageRoutes.js'

import PostController from '../controllers/PostController.js'

const router = express.Router()

router.use('/post', postRoutes)
router.use('/user', userRoutes)
router.use('/auth', authRoutes)
router.use('/ong', ongRoutes)
router.use('/admin', adminRoutes)
router.use('/image', imageRoutes)
router.get('/', PostController.getAllPosts)

export default router