import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { User } from "./domain/UserDomain";
import { Tracker } from "../tracker/domain/TrackerDomain";
import { UserRepository } from "./repository/UserRepository";
import { TrackerRepository } from "../tracker/repository/TrackerRepository";
import { ScrapPackageTrackInfo } from "../utils/ScrapPackageTrackInfo";

export class UserService {

  constructor(
    public userRepository: UserRepository,
    public trackRepository: TrackerRepository
  ) { }

  async handleLogin(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new Error("User doesn't exists");
    }

    const verify = await compare(password, user.password);

    if (!verify) {
      throw new Error("Wrong Password");
    }

    user.accessToken = sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    })

    return user
  }

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

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  async findById(userId: string): Promise<User> {
    const checkExists = await this.userRepository.findById(userId);

    if (!checkExists) {
      throw new Error("User doesn't exists");
    }

    return checkExists;
  }

  async searchPackageByCode(code: string): Promise<Tracker> {
    const track = await ScrapPackageTrackInfo(code);
    if (track.packageInfo.length === 0) {
      throw new Error("Check track code, package not found");
    }

    return track;
  }

  async addPackage(userId: string, code: string): Promise<User> {

    const checkExists = await this.userRepository.findById(userId);

    if (!checkExists) {
      throw new Error("User doesn't exists");
    }

    const checkExistsTracker = await this.trackRepository.findByCode(code);

    if (checkExistsTracker) {
      throw new Error("Package already exists");
    }

    const track = await ScrapPackageTrackInfo(code, userId);
    if (track.packageInfo.length === 0) {
      throw new Error("Verify your track code, package not found");
    }

    const trackAdded = await this.userRepository.addTrack(userId, track);
    await this.trackRepository.save(track);

    return trackAdded
  }
}
