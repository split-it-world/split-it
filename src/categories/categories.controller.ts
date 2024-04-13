import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryDto } from './dto/category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './schema/category.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {

  }
  @Post('/createCategory')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) :Promise<CreateCategoryDto> {
    return await this.service.createCategory(createCategoryDto);
  }
  
  @Post('/getAllCategories')
  async getAllCategories(): Promise<Category[]>{
    return await this.service.getAllCategories();
  }
}
