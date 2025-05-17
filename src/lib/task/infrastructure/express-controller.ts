import { z } from "zod";
import { Request, Response } from "express";
import { CreateTaskUseCase } from "../application/createTask.js";
import { DeleteTaskUseCase } from "../application/deleteTask.js";
import { GetTaskByIdUseCase } from "../application/getTaskById.js";
import { UpdateTaskUseCase } from "../application/updateTask.js";
import { GetTaskAllUseCase } from "../application/getTaskAllByUserId.js";

// schemas
const registerTaskSchema = z.object({
  id: z.string().optional(),
  title: z.string({ message: "Title is required" }),
  description: z.string({ message: "Description is required" }),
});
const paramUserIdSchema = z.object({
  userId: z.string({ message: "User id not found" }), // userId => .uuid()
});
const paramTaskIdAndUserIdSchema = paramUserIdSchema.extend({
  id: z.string({ message: "Task id not found" }), // id => .uuid()
});

export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly getTaskByIdUseCase: GetTaskByIdUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly getTaskAllUseCase: GetTaskAllUseCase
  ) {}

  async createTask(req: Request, res: Response) {
    try {
      const resultUserId = paramUserIdSchema
        .pick({ userId: true })
        .safeParse(req.params);

      if (!resultUserId.success) {
        return res.status(400).json(resultUserId.error);
      }

      const resultTask = registerTaskSchema.safeParse(req.body);

      if (!resultTask.success) {
        return res
          .status(400)
          .json(
            resultTask.error?.issues.map((issue) => issue.message).join(", ")
          );
      }

      const dataTask = resultTask.data;
      const userId = resultUserId.data.userId;

      const task = await this.createTaskUseCase.run({ ...dataTask, userId });

      res.status(201).json(task.toPrimitive());
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const resultParam = paramTaskIdAndUserIdSchema.safeParse(req.params);

      if (!resultParam.success) {
        return res.status(400).json(resultParam.error);
      }

      const { id, userId } = resultParam.data;

      const success = await this.deleteTaskUseCase.run(id, userId);

      res.status(200).json({ success });
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  }

  async getTaskAll(req: Request, res: Response) {
    try {
      const resultUserId = paramUserIdSchema.safeParse(req.params);

      if (!resultUserId.success) {
        return res.status(400).json(resultUserId.error); // Unauthorized error custom
      }

      const { userId } = resultUserId.data;

      const tasks = await this.getTaskAllUseCase.run(userId);
      res.json(tasks.map((task) => task.toPrimitive()));
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const resultParam = paramTaskIdAndUserIdSchema.safeParse(req.params);

      if (!resultParam.success) {
        return res.status(400).json(resultParam.error);
      }

      const { id, userId} = resultParam.data;

      const task = await this.getTaskByIdUseCase.run(id, userId);

      res.json(task?.toPrimitive());
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const resultParam = paramTaskIdAndUserIdSchema.safeParse(req.params);

      if (!resultParam.success) {
        return res.status(400).json(resultParam.error);
      }

      const resultBody = registerTaskSchema.omit({ id: true }).safeParse(req.body);

      if (!resultBody.success) {
        return res.status(400).json(resultBody.error);
      }

      const { id, userId } = resultParam.data;
      const data = resultBody.data;

      const task = await this.updateTaskUseCase.run({ taskId: id, userId, data});

      res.json(task.toPrimitive());
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  }
}
