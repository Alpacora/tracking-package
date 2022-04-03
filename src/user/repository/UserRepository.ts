import { Collection, Document, MongoClient, ObjectId } from "mongodb";
import { Service } from "typedi";
import { Tracker } from "../../tracker/domain/TrackerDomain";
import { IUserRepository } from "../domain/Repository";
import { User } from "../domain/UserDomain";
@Service()
export class UserRepository implements IUserRepository {

  public users: User[] = [];

  public client: MongoClient;
  public collection: Collection<Document>;

  async connectDB(): Promise<void> {
    this.client = new MongoClient(process.env.DATA_BASE_URL), { useNewUrlParser: true, useUnifiedTopology: true };

    await this.client.connect(async (err) => {
      this.collection = this.client.db('User').collection('users');
    })
  }

  async closeDbConnection(): Promise<void> {
    await this.client.close();
  }

  async save(body: User): Promise<User> {
    await this.connectDB();

    const result = await this.collection.insertOne({
      ...body,
      _id: new ObjectId(body._id)
    });

    // await this.users.push(body);
    console.log(result);

    return result;
  }

  async update(body: User): Promise<User> {
    const userIndex = await this.users.findIndex((element) => element._id === body._id);
    await this.users.slice(userIndex, 1);

    const userUpdated: User = {
      ...body,
      updatedAt: new Date()
    }

    return userUpdated;
  }

  async findAll(): Promise<User[]> {
    return await this.users;
  }

  async findById(userId: string): Promise<User> {
    const user = this.users.find((element) => element._id === userId);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((element) => element.email === email);
    return user;
  }

  async addTrack(userId: string, trackPackage: Tracker): Promise<User> {
    const user = this.users.find((element) => element._id === userId);
    const modifier = user;
    modifier.trackers.push(trackPackage);

    return modifier
  }
}
