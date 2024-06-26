import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
  @ApiProperty()
  id: string;

  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  type: string;

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  @ApiProperty()
  members: Types.ObjectId[];

  @Prop({ required: true })
  @ApiProperty()
  createdOn: Date;

  @Prop({ require: true })
  @ApiProperty()
  createdBy: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
