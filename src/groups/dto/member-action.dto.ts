import { ApiProperty } from '@nestjs/swagger';

export class MemberActionDto {
  @ApiProperty()
  groupId: string;
  @ApiProperty()
  memberIds: string[];
}
