import express from 'express'
import checkIfLogged from '../../middlewares/checkIfLogged.js'
import isAdmin from '../../middlewares/isAdmin.js'
import AdminController from '../../controllers/AdminController.js'

const router = express.Router()


router.post('/approvePost/:postId', checkIfLogged,isAdmin, AdminController.approvePost)
router.post('/reprovePost/:postId', checkIfLogged, isAdmin, AdminController.reprovePost)
router.delete('/delete/:postId', checkIfLogged, isAdmin, AdminController.deletePost)

// pega os posts que tem o status pending
router.get('/getPostsToApprove', checkIfLogged, isAdmin, AdminController.getPostsToApprove)
router.get('/getOnePostToApprove/:postId', checkIfLogged, isAdmin, AdminController.getOnePostToApprove)


export default router