import { ObjectId } from "mongodb";
import { Field, ID, ObjectType } from "type-graphql";
import { Tracker } from "../../tracker/domain/TrackerDomain";

@ObjectType()
export class User {
  @Field(_type => ID)
  public readonly _id?: string;

  @Field()
  public name: string;
  @Field()
  public email: string;
  @Field()
  public password: string;

  @Field(type => [Tracker], { nullable: true })
  public trackers?: Tracker[];

  @Field()
  public createdAt?: Date;
  @Field()
  public updatedAt?: Date;
  @Field()
  public active: boolean;

  @Field({ nullable: true })
  public accessToken?: string;

  constructor(props: Omit<User, '_id'>) {
    Object.assign(this, props)
  }
}

@ObjectType()
export class Token {
  @Field()
  public accessToken: string;
}
