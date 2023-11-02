import express from 'express'
import checkIfLogged from '../../middlewares/checkIfLogged.js'
import isAdmin from '../../middlewares/isAdmin.js'
import AdminController from '../../controllers/AdminController.js'

const router = express.Router()


router.post('/approvePost/:postId', checkIfLogged, isAdmin, AdminController.approvePost)
router.post('/reprovePost/:postId', checkIfLogged, isAdmin, AdminController.reprovePost)


export default router