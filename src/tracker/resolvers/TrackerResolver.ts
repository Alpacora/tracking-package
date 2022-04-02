import { Arg, Query, Resolver } from "type-graphql";
import { Tracker } from "../domain/TrackerDomain";
import { TrackerRepository } from "../repository/TrackerRepository";
import { TrackerService } from "../service";

@Resolver()
export class TrackerResolver {

  constructor(
    public trackerService = new TrackerService(new TrackerRepository())
  ) { }

  @Query(() => Tracker)
  async findByCode(
    @Arg('code') code: string
  ) {

    const tracker = await this.trackerService.findByCode(code);

    return tracker;
  }
}
