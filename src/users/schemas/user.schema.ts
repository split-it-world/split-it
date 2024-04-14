import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { UserDto } from '../dto/user-dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  friends: Types.ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'Group' }])
  groups: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
