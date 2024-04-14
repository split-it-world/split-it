import { ApiProperty } from '@nestjs/swagger';
import { BaseGroupDto } from './base-group.dto';
import { Group } from '../schemas/group.schema';

export class GroupDto extends BaseGroupDto{
    @ApiProperty()
    id: string;

    static fromEntity(group: Group): GroupDto {
        const { id, name } = group;
        const groupDto = new GroupDto();
        groupDto.id = id;
        groupDto.name = name;
        return groupDto;
    }
}