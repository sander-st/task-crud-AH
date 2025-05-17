// Import service simpleContainer and type constructor
import {
  SimpleContainer,
  Constructor as ConstructorType,
} from "./infrastructure/simpleContainer.js";

// import mudulos users
import { UserRepository } from "../user/domain/user-repository";
import { InMemoryUserRepository } from "../user/infrastructure/inMemoryUserRepository.js";
import { CreateUserUseCase } from "../user/application/createUserUseCase.js";
import { GetAllUserUseCase } from "../user/application/getAllUserUseCase.js";
import { GetByIdUseCase } from "../user/application/getByIdUseCase.js";
import { UserController } from "../user/infrastructure/express-user.controller.js";

// import mudulos tasks
import { TaskRepository } from "../task/domain/taskRepository";
import { InMemoryTaskRepository } from "../task/infrastructure/inMemoryTaskRepository.js";
import { CreateTaskUseCase } from "../task/application/createTask.js";
import { DeleteTaskUseCase } from "../task/application/deleteTask.js";
import { GetTaskByIdUseCase } from "../task/application/getTaskById.js";
import { UpdateTaskUseCase } from "../task/application/updateTask.js";
import { GetTaskAllUseCase } from "../task/application/getTaskAllByUserId.js";
import { TaskController } from "../task/infrastructure/express-controller.js";

const container = new SimpleContainer();

// register modules user
container.register<UserRepository>("userRepository", InMemoryUserRepository);
// Use a proper type cast to fix the type compatibility issue
container.register<CreateUserUseCase>(
  "createUserUseCase",
  CreateUserUseCase as ConstructorType<CreateUserUseCase>,
  ["userRepository"]
);
container.register<GetAllUserUseCase>(
  "getAllUserUseCase",
  GetAllUserUseCase as ConstructorType<GetAllUserUseCase>,
  ["userRepository"]
);
container.register<GetByIdUseCase>(
  "getByIdUseCase",
  GetByIdUseCase as ConstructorType<GetByIdUseCase>,
  ["userRepository"]
);
container.register<UserController>(
  "userController",
  UserController as ConstructorType<UserController>,
  ["createUserUseCase", "getAllUserUseCase", "getByIdUseCase"]
);

// DI: injection dependencies (task)
container.register<TaskRepository>("taskRepository", InMemoryTaskRepository);
container.register<CreateTaskUseCase>(
  "createTaskUseCase",
  CreateTaskUseCase as ConstructorType<CreateTaskUseCase>,
  ["taskRepository", "getByIdUseCase"]
);
container.register<DeleteTaskUseCase>(
  "deleteTaskUseCase",
  DeleteTaskUseCase as ConstructorType<DeleteTaskUseCase>,
  ["taskRepository", "getByIdUseCase"]
);
container.register<GetTaskByIdUseCase>(
  "getTaskByIdUseCase",
  GetTaskByIdUseCase as ConstructorType<GetTaskByIdUseCase>,
  ["taskRepository"]
);
container.register<UpdateTaskUseCase>(
  "updateTaskUseCase",
  UpdateTaskUseCase as ConstructorType<UpdateTaskUseCase>,
  ["taskRepository"]
);
container.register<GetTaskAllUseCase>(
  "getTaskAllUseCase",
  GetTaskAllUseCase as ConstructorType<GetTaskAllUseCase>,
  ["taskRepository", "getByIdUseCase"]
);
container.register<TaskController>(
  "taskController",
  TaskController as ConstructorType<TaskController>,
  [
    "createTaskUseCase",
    "deleteTaskUseCase",
    "getTaskByIdUseCase",
    "updateTaskUseCase",
    "getTaskAllUseCase",
  ]
);

export const userContainer = container;
export const taskContainer = container;

