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
    await this.client.connect();
    this.collection = this.client.db('User').collection('users');
  }

  async closeDbConnection(): Promise<void> {
    await this.client.close();
  }

  async save(body: Omit<User, '_id'>): Promise<User> {
    await this.connectDB();

    let userCreated = undefined;

    try {
      const response = await this.collection.insertOne(body);
      const createdUser = await this.collection.findOne({ _id: response.insertedId });
      userCreated = {
        ...createdUser,
        _id: createdUser._id.toString()
      };

    } catch (error) {
      throw new Error(`Server temporally unavailable, code: ${error}`);
    } finally {
      await this.closeDbConnection();
    }

    return userCreated;
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

    await this.connectDB();

    let crud = undefined;

    try {
      const usersFounded = await this.collection.find();

      crud = usersFounded;
    } catch (error) {
      throw new Error(`Server temporally unavailable, code: ${error}`);
    } finally {
      await this.closeDbConnection();
    }

    console.log(crud);

    return await crud;
  }

  async findById(userId: string): Promise<User> {
    // const user = this.users.find((element) => element._id === userId);

    await this.connectDB();

    let foundedUser = undefined;

    try {
      const user = await this.collection.findOne({ _id: new ObjectId(userId) });

      foundedUser = user;
    } catch (error) {
      throw new Error(`Server temporally unavailable, code: ${error}`);
    } finally {
      await this.closeDbConnection();
    }

    return foundedUser;
  }

  async findByEmail(email: string): Promise<User> {
    // const user = this.users.find((element) => element.email === email);

    await this.connectDB();

    let foundedUser = undefined;

    try {
      const user = await this.collection.findOne({ email: email });

      foundedUser = user;
    } catch (error) {
      throw new Error(`Server temporally unavailable, code: ${error}`);
    } finally {
      await this.closeDbConnection();
    }

    return foundedUser;
  }

  async addTrack(userId: string, trackPackage: Tracker): Promise<User> {
    await this.connectDB();

    let trackAdded = undefined;

    try {
      const user = await this.collection.findOneAndUpdate({ _id: new ObjectId(userId) },
        { $push: { 'trackers': trackPackage as never } },
        { upsert: true, returnDocument: 'after' });


      trackAdded = user.value;

    } catch (error) {
      throw new Error(`Server temporally unavailable, code: ${error}`);
    } finally {
      await this.closeDbConnection();
    }

    return trackAdded
  }
}
