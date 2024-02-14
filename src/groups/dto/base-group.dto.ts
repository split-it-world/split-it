import { ApiProperty } from '@nestjs/swagger';

export class BaseGroupDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  createdBy: string;
}
