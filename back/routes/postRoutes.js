import express from 'express'
import PostController from '../controllers/PostController.js'

const router = express.Router()

router.get('/:id', PostController.getPost)
router.post('/novo-post', PostController.createPost)
router.put('/editar', PostController.updatePost)
router.delete('/delete', PostController.deletePost)

export default router