import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { Service } from "typedi";
import { TrackerService } from "../service";
import { Tracker } from "../domain/TrackerDomain";
import { verifyAuth } from "../../middlewares/VerifyAuth";

@Service()
@Resolver()
export class TrackerResolver {

  constructor(
    public trackService: TrackerService
  ) { }

  @Query(() => Tracker)
  @UseMiddleware(verifyAuth)
  async findByCode(
    @Arg('_id') _id: string,
    @Arg('code') code: string
  ) {

    const tracker = await this.trackService.findByCode(_id, code);

    return tracker;
  }
}
