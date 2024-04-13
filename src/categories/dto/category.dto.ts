import { ApiProperty } from "@nestjs/swagger";
import { BaseCategoryDto } from "./base-category.dto";

export class CategoryDto extends BaseCategoryDto{
  @ApiProperty()
  userId: string
}