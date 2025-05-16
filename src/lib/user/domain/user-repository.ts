import { User } from "./user.js";

export interface UserRepository {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  /* update(id: string, name: string): Promise<boolean>;
  delete(id: string): Promise<boolean>; */
}

