import { Router } from "express";
import { TaskController } from "./express-controller.js";

const taskController = new TaskController();

const router = Router();

router.post("/", taskController.createTask.bind(taskController));
router.delete("/:id", taskController.deleteTask.bind(taskController));
router.put("/:id", taskController.updateTask.bind(taskController));
router.get("/:id", taskController.getTaskById.bind(taskController));
router.get("/", taskController.getTaskAll.bind(taskController));

export {router as taskRouter}
