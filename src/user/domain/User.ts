import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(_type => ID)
  public _id: string;

  @Field()
  public name: string;
  @Field()
  public email: string;
  @Field()
  public password: string;

  // @Field()
  // public trackers?: Trackers[];

  @Field()
  public createdAt?: Date;
  @Field()
  public updatedAt?: Date;
  @Field()
  public active: boolean;

  constructor(props: Omit<User, '_id'>) {
    Object.assign(this, props)
  }
}

@ObjectType()
export class Trackers {
  @Field()
  public trackCode: string;

  constructor(props: Trackers) {
    Object.assign(this, props);
  }
}