import { Task } from "../domain/task";
import { TaskRepository } from "../domain/taskRepository";
import { GetByIdUseCase } from "../../user/application/getByIdUseCase";

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
