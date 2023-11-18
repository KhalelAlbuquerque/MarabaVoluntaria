import ImageController from "../../controllers/ImageController.js";
import { Router } from "express";

const router = Router()

router.get('/:imageId', ImageController.getImage)
router.put('/create', ImageController.createImage)

export default router