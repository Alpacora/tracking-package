import { ITrackerRepository } from "../domain/Repository";
import { Tracker } from "../domain/TrackerDomain";

export class TrackerRepository implements ITrackerRepository {

  private trackers: Tracker[] = [];

  async save(tracker: Tracker): Promise<Tracker> {
    await this.trackers.push(tracker);
    return tracker
  }

  async findByCode(code: string): Promise<Tracker> {
    const trackerFounded = await this.trackers.find((element) => element.code === code);
    return trackerFounded;
  }
}
