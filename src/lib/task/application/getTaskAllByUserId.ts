import { Task } from "../domain/task.js";
import { TaskRepository } from "../domain/taskRepository.js";
import { GetByIdUseCase } from "../../user/application/getByIdUseCase.js";

export class GetTaskAllUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private getByIdUseCase: GetByIdUseCase
  ) {}

  async run(userId: string): Promise<Task[]> {
    const user = await this.getByIdUseCase.run(userId);
    if (!user) throw new Error(`User not found ${userId}`);
    return await this.taskRepository.findAllTasksByUserId(userId);
  }
}
