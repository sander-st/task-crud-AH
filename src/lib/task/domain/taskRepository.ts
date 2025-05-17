import { Task } from "./task";

export interface TaskRepository {
  saveTask(task: Task): Promise<void>;
  findTaskByIdAndUserId(id: string, userId: string): Promise<Task | null>;
  updateTask(id: string, task: Task): Promise<void>;
  deleteTaskAndUserId(id: string, userId: string): Promise<boolean>;
  findAllTasksByUserId(userId: string): Promise<Task[]>;
  // markAsCompleted(id: string): Promise<boolean>;
  // markAsUncompleted(id: string): Promise<boolean>;
}
