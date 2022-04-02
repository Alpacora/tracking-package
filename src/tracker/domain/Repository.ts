import { Tracker } from "./TrackerDomain";

export interface ITrackerRepository {
  save(tracker: Tracker): Promise<Tracker>;
  findByCode(trackId: string): Promise<Tracker>;
}
