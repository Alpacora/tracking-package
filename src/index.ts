import { TrackerRepository } from "./tracker/repository/TrackerRepository";
import { TrackerResolver } from "./tracker/resolvers/TrackerResolver";
import { TrackerService } from "./tracker/service";
import { UserRepository } from "./user/repository/UserRepository";
import { UserResolver } from "./user/resolvers/UserResolver";
import { UserService } from "./user/service";

const trackerRepository = new TrackerRepository();

const userService = new UserService(new UserRepository(), trackerRepository);
const trackerService = new TrackerService(trackerRepository);

const userResolver = new UserResolver(
  userService
);

const trackerResolver = new TrackerResolver(
  trackerService
);

export {
  userResolver,
  trackerResolver,
}

