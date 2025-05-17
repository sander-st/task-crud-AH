import { TaskRepository } from "../domain/taskRepository";
import { GetByIdUseCase } from "../../user/application/getByIdUseCase.js";

export class DeleteTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private getByIdUseCase: GetByIdUseCase
  ) {}

  async run(id: string, userId: string): Promise<boolean> {
    const user = await this.getByIdUseCase.run(userId)

    if(!user) throw new Error(`User not found ${userId}`)

    const task = await this.taskRepository.findTaskByIdAndUserId(id, userId)

    if(!task) throw new Error(`Task not found ${id}`)

    return await this.taskRepository.deleteTaskAndUserId(id, userId)
  }
}
