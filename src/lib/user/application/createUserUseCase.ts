import { RegisterUserCommandSchema, RegisterUserCommand } from "./dtos/registerUserCommand";
import { UserRepository } from "../domain/user-repository";
import { User } from "../domain/user";

export class CreateUserUseCase {
  private constructor(private readonly userRepository: UserRepository) {}

  async run(command: RegisterUserCommand): Promise<User> {
    const validatedResult = RegisterUserCommandSchema.safeParse(command);

    if(!validatedResult.success) throw new Error(validatedResult.error.issues.map(issue => issue.message).join(", "))

    const userResult = validatedResult.data
    const existingUser = await this.userRepository.findById(userResult.id || "")

    if(existingUser) throw new Error(`User already exists with id ${userResult.id}`)

    const user = User.create(userResult);
    return await this.userRepository.save(user);
  }
}
