import { Task } from "../domain/task";
import { TaskRepository } from "../domain/taskRepository";

export class GetTaskByIdUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async run(id: string): Promise<Task | null> {
    const task = await this.taskRepository.findTaskById(id);

    if (!task) throw new Error(`Task not found ${id}`);

    return task;
  }
}
