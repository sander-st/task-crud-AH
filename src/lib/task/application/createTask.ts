import { Task } from "../domain/task.js";
import { TaskRepository } from "../domain/taskRepository";
import { GetByIdUseCase } from "../../user/application/getByIdUseCase.js";
import { registerCommandTaskSchema, RegisterCommandTask } from "./dtos/registerCommand.js";

export class CreateTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private getByIdUseCase: GetByIdUseCase
  ) {}

  async run(command: RegisterCommandTask): Promise<Task> {
    const validationResult = registerCommandTaskSchema.safeParse(command);

    if(!validationResult.success) throw new Error(validationResult.error.issues.map(issue => issue.message).join(", "))

    const validatedResult = validationResult.data
    const user = await this.getByIdUseCase.run(validatedResult.userId)

    // create custom error and throw it from the infrastructure
    if(!user) throw new Error(`User not found ${validatedResult.userId}`)

    const task = Task.createTask(validatedResult)
    await this.taskRepository.saveTask(task)
    return task
  }
}
