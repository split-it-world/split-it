import { ApiProperty } from "@nestjs/swagger";

export class SplitDto {
  @ApiProperty()
  num: number;
  @ApiProperty()
  den: number;
  @ApiProperty()
  userId: string;
}