import { IUserRepository } from "../domain/Repository";
import { User } from "../domain/User";

export class UserRepository implements IUserRepository {

  public users: User[] = [];

  async save(body: User): Promise<User> {
    await this.users.push(body);
    return body;
  }

  async update(body: Partial<User>): Promise<User> {
    return null
  }

  async findAll(): Promise<User[]> {
    return await this.users
  }

  async findById(userId: string): Promise<User> {
    const user = this.users.find((element) => element._id === userId);
    return user;
  }
}
