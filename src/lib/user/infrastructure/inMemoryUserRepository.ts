import { User } from "../domain/user.js";
import { UserRepository } from "../domain/user-repository";

export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  constructor() {
    const sampleUser = [
      User.create({ id: "user1", name: "Jhon Dow" }),
      User.create({ id: "user2", name: "Max Payne" }),
    ];

    sampleUser.forEach((user) => {
      this.users.set(user.id, user);
    });
  }

  async save(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;
    return User.create(user);
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values()).map((user) => User.create(user));
  }
}
