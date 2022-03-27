import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../domain/User";
import { UserService } from "../service";
import { UserRepository } from "../repository/UserRepository";
import { v4 } from "uuid";
import bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {

  constructor(
    private userService = new UserService(new UserRepository())
  ) { }

  @Query(() => [User])
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Query(() => User)
  async findById(
    @Arg('_id') _id: string
  ) {
    const user = await this.userService.findById(_id);
    return user;
  }

  @Mutation(() => User)
  async save(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('active') active: boolean,
  ) {

    const user: User = {
      _id: v4(),
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      active,
      createdAt: new Date()
    }

    await this.userService.save(user);

    return user;
  }
}
