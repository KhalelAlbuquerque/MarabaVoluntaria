import express from 'express'
import PostController from '../../controllers/PostController.js'
import checkIfLogged from '../../middlewares/checkIfLogged.js'
import isONG from '../../middlewares/isONG.js'

const router = express.Router()

router.get('/', PostController.getAllPosts)
router.get('/search', PostController.searchPostByName)
router.get('/:id', PostController.getPost)
router.post('/novo-post',  checkIfLogged, isONG, PostController.createPost)
router.put('/editar/:postId', checkIfLogged, isONG, PostController.updatePost)
router.delete('/delete/:postId', checkIfLogged, isONG, PostController.deletePost)
router.post('/postVolunteers/:postId', checkIfLogged, isONG, PostController.getPostVolunteers)
router.post('/endPost/:postId', checkIfLogged, isONG, PostController.endPost)

export default router