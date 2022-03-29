import { UserRepository } from "./user/repository/UserRepository";
import { UserResolver } from "./user/resolvers/UserResolver";
import { UserService } from "./user/service";
import { ScrapPackageTrackInfo } from "./utils/ScrapPackageTrackInfo";


const userService = new UserService(new UserRepository(), new ScrapPackageTrackInfo());

const userResolver = new UserResolver(
  userService
);

