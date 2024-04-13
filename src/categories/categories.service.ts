import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryModel.find();
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryModel.create({...createCategoryDto, userId: 'shashvat'});
  }
}
