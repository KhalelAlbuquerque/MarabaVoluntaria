import express from 'express'
import PostController from '../controllers/PostController.js'
import checkIfLogged from '../middlewares/checkIfLogged.js'
import isONG from '../middlewares/isONG.js'

const router = express.Router()

router.get('/search', PostController.searchPostByName)
router.get('/:id', PostController.getPost)
router.post('/novo-post',  checkIfLogged, isONG, PostController.createPost)
router.put('/editar', PostController.updatePost)
router.delete('/delete/:postId', PostController.deletePost)
router.post('/postVolunteers/:postId', PostController.getPostVolunteers)
router.post('/endPost/:postId', checkIfLogged, PostController.endPost)

export default router