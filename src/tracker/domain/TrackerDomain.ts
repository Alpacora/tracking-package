import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Tracker {

  @Field(_type => ID)
  public _id?: string;

  @Field()
  public userId?: string;

  @Field()
  public code: string;

  @Field(type => [TrackInfo])
  public packageInfo: TrackInfo[];

  @Field(type => [TrackerMessage], { nullable: true })
  public messages?: TrackerMessage[];

  @Field()
  public createdAt?: Date;
  @Field()
  public updatedAt?: Date;

  constructor(props: Omit<Tracker, '_id'>) {
    Object.assign(this, props);
  }
}

@ObjectType()
export class TrackerMessage {

  @Field()
  public senderId: string;
  @Field()
  public userName: string;
  @Field()
  public content: string;
  @Field()
  public createdAt?: Date;

  constructor(props: TrackerMessage) {
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