import { Request, Response } from "express";
import { serviceContainer } from "../../shared/service-containes.js";

export class TaskController {

  async createTask(req: Request, res: Response) {
    try {
      const { id, title, description } = req.body as {
        id: string;
        title: string;
        description: string;
      };

      const task = await serviceContainer.createTask.run(id, title, description);
      res.status(201).json(task);
    } catch (error) {
      if(error instanceof Error) res.status(500).json({ error: error.message });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params

      const success = await serviceContainer.deleteTask.run(id);

      res.status(200).json({ success });
    } catch (error) {
      if(error instanceof Error) res.status(500).json({ error: error.message });
    }
  }

  async getTaskAll(_req: Request, res: Response) {
    try {
      const tasks = await serviceContainer.getTaskAll.run();
      res.json(tasks);
    } catch (error) {
      if(error instanceof Error) res.status(500).json({ error: error.message });
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const {id} = req.params;

      const task = await serviceContainer.getTaskById.run(id);

      res.json(task);
    } catch (error) {
      if(error instanceof Error) res.status(500).json({ error: error.message });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;

      const task = await serviceContainer.updateTask.run(id, {
        title,
        description,
        completed,
      });

      res.json(task);
    } catch (error) {
      if(error instanceof Error) res.status(500).json({ error: error.message });
    }
  }
}
