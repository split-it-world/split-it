import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @ApiProperty()
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @ApiProperty()
  category: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
