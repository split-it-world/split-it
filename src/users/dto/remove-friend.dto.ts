import { ApiProperty } from '@nestjs/swagger';

export class RemoveFriendsDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  friendIds: string[];
}
