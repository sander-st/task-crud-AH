import { Router } from "express";
import { UserController } from "./express-user.controller";
import { userContainer } from "../../shared/service-container.js";

const userController = userContainer.resolve<UserController>('userController')

const router = Router();

router.post('/', userController.createUser.bind(userController));
router.get('/', userController.getAllUser.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));

export {router as userRouter}
