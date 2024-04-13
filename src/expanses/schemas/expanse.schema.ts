import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type ExpanseDocument = HydratedDocument<Expanse>;

@Schema()
export class Expanse {
  @ApiProperty()
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Group' })
  @ApiProperty()
  groupId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  @ApiProperty()
  categoryId: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Comment' }])
  @ApiProperty()
  CommentIdList: Types.ObjectId[];

  @Prop({ require: true })
  @ApiProperty()
  insertedBy: string;

  @Prop()
  @ApiProperty()
  insertTimeStamp: Date;

  @Prop()
  @ApiProperty()
  expanseOwner: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  @ApiProperty()
  expanseAmount: number;
}

export const ExpanseSchema = SchemaFactory.createForClass(Expanse);
