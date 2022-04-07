import { Collection, MongoClient } from "mongodb";
import { Service } from "typedi";
import { ITrackerRepository } from "../domain/Repository";
import { Tracker } from "../domain/TrackerDomain";
@Service()
export class TrackerRepository implements ITrackerRepository {

  private trackers: Tracker[] = [];

  public client: MongoClient;
  public collection: Collection<Document>;

  async connectDB(): Promise<void> {
    this.client = new MongoClient(process.env.DATA_BASE_URL), { useNewUrlParser: true, useUnifiedTopology: true };
    await this.client.connect();
    this.collection = this.client.db('User').collection('packages');
  }

  async closeDbConnection(): Promise<void> {
    await this.client.close();
  }

  async save(tracker: Omit<Tracker, '_id'>): Promise<Tracker> {
    await this.connectDB();

    let trackerAdded = undefined;

    try {
      await this.collection.insertOne(tracker);
      const createdTracker = await this.collection.findOne({ code: tracker.code });

      trackerAdded = createdTracker;

    } catch (error) {
      throw new Error(`Server temporally unavailable, code: ${error}`);
    } finally {
      await this.closeDbConnection();
    }

    return trackerAdded;
  }

  async findByCode(code: string): Promise<Tracker> {
    await this.connectDB();

    let trackerFounded = undefined;

    try {
      const tracker = await this.collection.findOne({ code: code });

      trackerFounded = tracker;

    } catch (error) {
      throw new Error(`Server temporally unavailable, code: ${error}`);
    } finally {
      await this.closeDbConnection();
    }

    return trackerFounded;
  }
}
