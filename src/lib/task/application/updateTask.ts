import { Task } from "../domain/task";
import { TaskRepository } from "../domain/taskRepository";
import { RegisterCommandTask } from "./dtos/registerCommand.js";

// type RequireKey<T, K extends keyof T> = T & Required<Pick<T, K>>;
type UpdateTask = Omit<RegisterCommandTask, "completed" | "createdAt" | "updatedAt" | "userId" | "id">;
interface UpdateTaskCommand {
  taskId: string;
  userId: string;
  data: UpdateTask;
};

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async run(command: UpdateTaskCommand): Promise<Task> {
    const task = await this.taskRepository.findTaskByIdAndUserId(command.taskId, command.userId);

    if(!task) throw new Error(`Task not found ${command.taskId}`);

    task.update(command.data);

    await this.taskRepository.updateTask(command.taskId, task)

    return task;
  }
}
