import { TaskRepository } from "../domain/taskRepository";

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async run(id: string): Promise<boolean> {
    const success = await this.taskRepository.deleteTask(id);

    if (!success) throw new Error(`Task not deleted ${id}`);

    return success;
  }
}
