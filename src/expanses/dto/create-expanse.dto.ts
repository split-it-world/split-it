import { ApiProperty } from "@nestjs/swagger";
import { BaseExpanseDto } from "./base-expanse.dto";
import { SplitDto } from "./split.dto";

export class CreateExpanseDto extends BaseExpanseDto {
  @ApiProperty()
  splits: SplitDto[];
}