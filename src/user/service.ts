import { Tracker, TrackInfo, User } from "./domain/User";
import { UserRepository } from "./repository/UserRepository";
import { ScrapPackageTrackInfo } from "../utils/ScrapPackageTrackInfo";

export class UserService {

  constructor(
    public userRepository: UserRepository,
    public scrapPackageTrackInfo: ScrapPackageTrackInfo
  ) { }

  async save(body: User): Promise<User> {
    this.userRepository.save(body);

    return body;
  }

  async update(body: Partial<User>): Promise<User> {

    const existUser = await this.userRepository.findById(body._id);

    if (!existUser) {
      throw new Error("User doesn't exists");
    }

    existUser.name = body.name ? body.name : existUser.name;
    existUser.email = body.email ? body.email : existUser.email;
    existUser.password = body.password ? body.password : existUser.password;
    existUser.active = body.active;

    const userUpdated = this.userRepository.update(existUser);
    return userUpdated;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findById(userId: string): Promise<User> {
    const checkExists = await this.userRepository.findById(userId);

    if (!checkExists) {
      throw new Error("User doesn't exists");
    }

    return checkExists;
  }

  async searchPackageByCode(code: string): Promise<Tracker> {
    const track = await this.scrapPackageTrackInfo.execute(code);
    if (track.packageInfo.length === 0) {
      throw new Error("Check track code, package not found");
    }

    return track;
  }

}