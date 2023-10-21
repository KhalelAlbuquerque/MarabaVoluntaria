import OngController from "../../controllers/OngController.js";
import checkIfLogged from "../../middlewares/checkIfLogged.js";
import express from 'express'

const router = express.Router()

router.get('/', OngController.getAllOngs)
router.get('/ong/:ongId', OngController.getOng)
router.post('/registrar', OngController.createOng)
router.put('/editar', checkIfLogged, OngController.updateOng)
router.delete('/delete/:ongId', checkIfLogged,OngController.deleteOng)
router.post('/apply/:postId', checkIfLogged, OngController.applyToPost)
router.post('/unapply/:postId', checkIfLogged, OngController.unapplyFromPost)
router.post('/ongInscriptions/:ongId', OngController.getOngInscriptions)



export default router