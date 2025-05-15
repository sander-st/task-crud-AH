import { CreateTaskUseCase } from "../task/application/createTask.js";
import { DeleteTaskUseCase } from "../task/application/deleteTask.js";
import { UpdateTaskUseCase } from "../task/application/updateTask.js";
import { GetTaskByIdUseCase } from "../task/application/getTaskById.js";
import { GetTaskAllUseCase } from "../task/application/getTaskAll.js";
import { InMemoryTaskRepository } from "../task/infrastructure/inMemoryTaskRepository.js";

const taskRepository = new InMemoryTaskRepository();

export const serviceContainer = {
  createTask: new CreateTaskUseCase(taskRepository),
  deleteTask: new DeleteTaskUseCase(taskRepository),
  updateTask: new UpdateTaskUseCase(taskRepository),
  getTaskById: new GetTaskByIdUseCase(taskRepository),
  getTaskAll: new GetTaskAllUseCase(taskRepository),
}
