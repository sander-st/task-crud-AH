import { User } from "../domain/user";
import { UserRepository } from "../domain/user-repository";

export class GetByIdUseCase {
  private constructor(private readonly userRepository: UserRepository) {}

  async run(id: string): Promise<User | null>{
    const user = await this.userRepository.findById(id);

    if(!user) throw new Error(`User not found ${id}`);

    return user
  }

}
