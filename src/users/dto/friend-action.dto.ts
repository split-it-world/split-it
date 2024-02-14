import { ApiProperty } from '@nestjs/swagger';

export class FriendActionDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  friendIds: string[];
}
