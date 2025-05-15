import { Task } from "../domain/task";
import { TaskRepository } from "../domain/taskRepository";

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async run(
    id: string,
    updateTask: {
      title: string;
      description: string;
      completed: boolean;
    }
  ): Promise<Task> {
    const task = await this.taskRepository.findTaskById(id);

    if (!task) throw new Error(`Task not found ${id}`);

    task.update({
      title: updateTask.title,
      description: updateTask.description,
      completed: updateTask.completed,
    });

    return await this.taskRepository.updateTask(id, task);
  }
}
