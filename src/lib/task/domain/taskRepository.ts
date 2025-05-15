import { Task } from "./task";

export interface TaskRepository {
  saveTask(task: Task): Promise<Task>;
  findTaskById(id: string): Promise<Task | null>;
  updateTask(id: string, task: Task): Promise<Task>;
  deleteTask(id: string): Promise<boolean>;
  findAllTasks(): Promise<Task[]>;
}
