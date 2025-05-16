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

export const userContainer = container;
