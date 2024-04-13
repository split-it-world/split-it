import { ApiProperty } from "@nestjs/swagger";

export class BaseCategoryDto {
  @ApiProperty()
  category: string
}