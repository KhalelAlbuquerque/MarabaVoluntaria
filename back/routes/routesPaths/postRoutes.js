import express from 'express'
import PostController from '../../controllers/PostController.js'
import checkIfLogged from '../../middlewares/checkIfLogged.js'
import isONG from '../../middlewares/isONG.js'
import checkPostOwner from '../../middlewares/checkPostOwner.js'

const router = express.Router()


router.get('/approvedPosts', PostController.getApprovedPosts)
router.get('/search', PostController.searchPostByName)
router.get('/:id', PostController.getPost)
router.post('/novo-post',  checkIfLogged, isONG, PostController.createPost)
router.put('/editar/:postId', checkIfLogged, isONG, checkPostOwner,PostController.updatePost)
router.delete('/delete/:postId', checkIfLogged, isONG, checkPostOwner, PostController.deletePost)
router.post('/postVolunteers/:postId', checkIfLogged, isONG, checkPostOwner,PostController.getPostVolunteers)
router.post('/endPost/:postId', checkIfLogged, isONG, checkPostOwner,PostController.endPost)
router.get('/', PostController.getAllPosts)

export default router