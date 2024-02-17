import { ApiProperty } from "@nestjs/swagger";

export class BaseExpanseDto {
  @ApiProperty()
  description: string;
  @ApiProperty()
  groupId: string;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  commentIdList: string[];
  @ApiProperty()
  expanseAmount: number;
  @ApiProperty()
  expanseOwner: string;
}