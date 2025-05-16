import { User } from "../domain/user";
import { UserRepository } from "../domain/user-repository";

export class GetAllUserUseCase {
  private constructor(private readonly userRepository: UserRepository) {}

  async run(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
