import { Request, Response } from "express";
import { CreateUserUseCase } from "../../user/application/createUserUseCase.js";
import { GetAllUserUseCase } from "../../user/application/getAllUserUseCase.js";
import { GetByIdUseCase } from "../../user/application/getByIdUseCase.js";

// command user register
import { RegisterUserCommandSchema } from "../../user/application/dtos/registerUserCommand.js";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly getByIdUseCase: GetByIdUseCase
  ) {}

  async createUser(req: Request, res: Response) {
    try {
      const result = RegisterUserCommandSchema.safeParse(req.body);

      if (!result.success) {
        res
          .status(400)
          .json(result.error?.issues.map((issue) => issue.message).join(", "));
        return;
      }

      const user = await this.createUserUseCase.run(result.data);

      res.status(201).json(user.toPrimitives());
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  }

  async getAllUser(_req: Request, res: Response) {
    try {
      const users = await this.getAllUserUseCase.run();
      res.json(users);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await this.getByIdUseCase.run(id);

      res.json(user);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  }
}
