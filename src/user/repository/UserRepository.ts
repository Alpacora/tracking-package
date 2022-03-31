import { IUserRepository } from "../domain/Repository";
import { Tracker, User } from "../domain/User";

export class UserRepository implements IUserRepository {

  public users: User[] = [];

  async save(body: User): Promise<User> {
    await this.users.push(body);
    return body;
  }

  async update(body: User): Promise<User> {
    const userIndex = await this.users.findIndex((element) => element._id === body._id);
    await this.users.slice(userIndex, 1);

    const userUpdated: User = {
      ...body,
      updatedAt: new Date()
    }

    return userUpdated;
  }

  async findAll(): Promise<User[]> {
    return await this.users;
  }

  async findById(userId: string): Promise<User> {
    const user = this.users.find((element) => element._id === userId);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((element) => element.email === email);
    return user;
  }

  async addTrack(userId: string, trackPackage: Tracker): Promise<User> {
    const user = this.users.find((element) => element._id === userId);
    const modifier = user;
    modifier.trackers.push(trackPackage);

    return modifier
  }
}
