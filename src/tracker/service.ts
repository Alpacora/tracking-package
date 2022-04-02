import { Tracker } from "./domain/TrackerDomain";
import { TrackerRepository } from "./repository/TrackerRepository";

export class TrackerService {
  constructor(
    public trackerRepository: TrackerRepository,
  ) { }

  async findByCode(code: string): Promise<Tracker> {
    const tracker = await this.trackerRepository.findByCode(code);

    if (!tracker) {
      throw new Error('Package not exists');
    }

    return tracker
  }
}