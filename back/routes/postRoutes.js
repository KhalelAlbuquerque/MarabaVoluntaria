import express from 'express'
import PostController from '../controllers/PostController.js'

const router = express.Router()

router.get('/:id', PostController.getPost)
router.post('/novo-post', PostController.createPost)
router.put('/editar', PostController.updatePost)
router.delete('/delete', PostController.deletePost)
router.post('/postVolunteers/:postId', PostController.getPostVolunteers)

export default router