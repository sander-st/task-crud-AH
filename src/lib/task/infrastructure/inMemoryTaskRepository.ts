import { TaskRepository } from "../domain/taskRepository.js";
import { Task, TaskProps } from "../domain/task.js";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Map<string, TaskProps> = new Map();

  async saveTask(task: Task): Promise<void> {
    this.tasks.set(task.id, task.toPrimitive());
  }

  async findTaskByIdAndUserId(id: string, userId: string): Promise<Task | null> {
    const task = this.tasks.get(id);
    if(task && task.userId === userId) return Task.createTask(task); // rehidrate task
    return null;
  }

  async updateTask(id: string, task: Task): Promise<void> {
    if(!this.tasks.has(id)) throw new Error(`Task not found ${id}`);
    this.tasks.set(id, task.toPrimitive())
  }

  async deleteTaskAndUserId(id: string, userId: string): Promise<boolean> {
    const task = this.tasks.get(id);

    if(task && task.userId === userId) {
      this.tasks.delete(id);
      return true;
    }
    return false;
  }

  async findAllTasksByUserId(userId: string): Promise<Task[]> {
    return Array.from(this.tasks.values())
    .filter(taskData => taskData.userId === userId)
    .map(taskData => Task.createTask(taskData));
  }
}

