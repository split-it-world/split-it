import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty()
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  phoneNumber: string;

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  @ApiProperty()
  friends: Types.ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'Group' }])
  @ApiProperty()
  groups: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
