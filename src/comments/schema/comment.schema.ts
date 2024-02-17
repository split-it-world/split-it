import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @ApiProperty()
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @ApiProperty()
  userId: Types.ObjectId;

  @Prop()
  @ApiProperty()
  comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
