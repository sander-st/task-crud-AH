import { Task } from "../domain/task";
import { TaskRepository } from "../domain/taskRepository";

export class GetTaskAllUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async run(): Promise<Task[]> {
    return await this.taskRepository.findAllTasks();
  }
}
