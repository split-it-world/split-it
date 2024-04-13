import { ApiParam, ApiProperty } from "@nestjs/swagger";

export class CommentActionDto {
  @ApiProperty()
  groupId: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  comment: string;
}