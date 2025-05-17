import { Task } from "../domain/task.js";
import { TaskRepository } from "../domain/taskRepository.js";

export class GetTaskByIdUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async run(id: string, userId: string): Promise<Task | null> {
    const task = await this.taskRepository.findTaskByIdAndUserId(id, userId);

    if (!task) throw new Error(`Task not found ${id}`);

    return task;
  }
}
