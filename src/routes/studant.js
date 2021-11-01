import multer from "multer";
import {
  Router
} from "express";
import StudantController from "../controllers/StudantController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import uploadConfig from '../config/upload';

const router = new Router();
const upload = multer(uploadConfig)

router.get('/', AuthMiddleware, StudantController.index);
router.post('/', AuthMiddleware, StudantController.store);

// Imagem do estudante
router.post('/upload', AuthMiddleware, upload.single('photo'), StudantController.uploadStore);
router.delete('/image', AuthMiddleware, StudantController.deleteImage);

router.get('/:id', AuthMiddleware, StudantController.show);
router.put('/', AuthMiddleware, StudantController.update);
router.delete('/', AuthMiddleware, StudantController.destroy);

export default router;
