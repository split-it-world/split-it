import { ApiProperty } from '@nestjs/swagger';
import { BaseGroupDto } from './base-group.dto';

export class GroupDto extends BaseGroupDto{
    @ApiProperty()
    id: string;
}