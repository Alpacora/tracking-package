import { User } from "./UserDomain";
import { Tracker } from "../../tracker/domain/TrackerDomain";

export interface IUserRepository{
  save(body: User): Promise<User>;
  update(body: Partial<User>): Promise<User>;
  findById(userId: string): Promise<User>;
  findByEmail(userId: string): Promise<User>;
  findAll(): Promise<User[]>;
  addTrack(userId: string, trackPackage: Tracker):  Promise<User>;
}