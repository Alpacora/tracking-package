import { User } from "./domain/User";
import { UserRepository } from "./repository/UserRepository";

export class UserService {

  constructor(
    public userRepository: UserRepository
  ) { }

  async save(body: User) {
    this.userRepository.save(body);
    
    return body;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findById(userId: string) {
    const checkExists = await this.userRepository.findById(userId);

    if(!checkExists) {
      console.log('Use doesnt exist');
    }

    return checkExists;
  }

}