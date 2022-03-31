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

@ObjectType()
export class Tracker {
  @Field()
  public code: string;

  @Field(type => [TrackInfo])
  public packageInfo: TrackInfo[];

  constructor(props: Tracker) {
    Object.assign(this, props);
  }
}
@ObjectType()
export class TrackInfo {
  @Field()
  public status: string;
  @Field()
  public data: string;
  @Field()
  public hora?: string;
  @Field()
  public origem?: string;
  @Field()
  public destino?: string;
  @Field()
  public local: string;

  constructor(props: TrackInfo) {
    Object.assign(this, props);
  }
}
