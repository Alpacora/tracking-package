import { User } from "./User";

export interface IUserRepository{
  save(body: User): Promise<User>;
  update(body: Partial<User>): Promise<User>;
  findById(userId: string): Promise<User>;
  findAll(): Promise<User[]>;
}