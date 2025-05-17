import { Task } from "../domain/task";
import { TaskRepository } from "../domain/taskRepository";

export class GetTaskByIdUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async run(id: string, userId: string): Promise<Task | null> {
    const task = await this.taskRepository.findTaskByIdAndUserId(id, userId);

    if (!task) throw new Error(`Task not found ${id}`);

    return task;
  }
}
