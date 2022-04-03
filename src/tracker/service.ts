import { Service } from "typedi";
import { Tracker } from "./domain/TrackerDomain";
import { TrackerRepository } from "./repository/TrackerRepository";

@Service()
export class TrackerService {
  constructor(
    public trackerRepository: TrackerRepository,
  ) { }

  async findByCode(userId: string, code: string): Promise<Tracker> {
    const tracker = await this.trackerRepository.findByCode(code);

    if (!tracker) {
      throw new Error('Package not exists');
    }

    if (tracker.userId !== userId) {
      throw new Error('You dont have permission to see this package info');
    }

    return tracker
  }
}