import { Task } from "../domain/task";
import { TaskRepository } from "../domain/taskRepository";

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async run(id: string, title: string, description: string): Promise<Task> {
    const existingTask = await this.taskRepository.findTaskById(id);

    if (existingTask) throw new Error(`Task already exists ${id}`);

    const newTask = Task.createTask(id, title, description);
    return await this.taskRepository.saveTask(newTask);
  }
}
