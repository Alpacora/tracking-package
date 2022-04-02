import { UserRepository } from "./user/repository/UserRepository";
import { UserResolver } from "./user/resolvers/UserResolver";
import { UserService } from "./user/service";

const userService = new UserService(new UserRepository());

const userResolver = new UserResolver(
  userService
);

