import { TaskRepository } from "../domain/taskRepository";
import { Task } from "../domain/task";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async saveTask(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async findTaskById(id: string): Promise<Task | null> {
    return this.tasks.find((task) => task.id === id) || null;
  }

  async updateTask(id: string, task: Task): Promise<Task> {
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks[index] = task;
    return task;
  }

  async deleteTask(id: string): Promise<boolean> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if(index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }

  async findAllTasks(): Promise<Task[]> {
    return this.tasks;
  }
}

