import {
  Router
} from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middlewares/AuthMiddleware";
const router = new Router();

router.get('/', authMiddleware, UserController.index);
router.get('/:id', authMiddleware, UserController.show);

router.post('/', authMiddleware, UserController.store);
router.put('/', authMiddleware, UserController.update);
router.delete('/', authMiddleware, UserController.destroy);

export default router;
