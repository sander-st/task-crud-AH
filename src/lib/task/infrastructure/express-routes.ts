import { Router, RequestHandler } from "express";
import { TaskController } from "./express-controller.js";
import { taskContainer } from "../../shared/service-container.js";

const taskController = taskContainer.resolve<TaskController>("taskController");

const router = Router({ mergeParams: true});

router.post("/", taskController.createTask.bind(taskController) as RequestHandler);
router.delete("/:id", taskController.deleteTask.bind(taskController) as RequestHandler);
router.get("/:id", taskController.getTaskById.bind(taskController) as RequestHandler);
router.get("/", taskController.getTaskAll.bind(taskController) as RequestHandler);
router.put("/:id", taskController.updateTask.bind(taskController) as RequestHandler);

export { router as taskRouter };
