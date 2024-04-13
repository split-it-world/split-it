import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type SplitDocument = HydratedDocument<Split>;

@Schema()
export class Split {
  @ApiProperty()
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Expanse' })
  @ApiProperty()
  expanseId: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @ApiProperty()
  splitPerson: Types.ObjectId;

  @Prop()
  @ApiProperty()
  num: number;

  @Prop()
  @ApiProperty()
  den: number;
}

export const SplitSchema = SchemaFactory.createForClass(Split);
