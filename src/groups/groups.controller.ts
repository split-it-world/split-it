import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { BaseGroupDto } from './dto/base-group.dto';
import { Group } from './schemas/group.schema';
import { MemberActionDto } from './dto/member-action.dto';
import { GroupDto } from './dto/group.dto';

@Controller('groups')
@ApiTags('groups')
export class GroupsController {
  constructor(private readonly service: GroupsService) {}

  @Post('/')
  @ApiOperation({
    summary: 'Create New Group',
    description: 'Create New Group',
  })
  @ApiResponse({
    status: 201,
    type: BaseGroupDto,
  })
  async createGroup(@Body() createGroupDto: CreateGroupDto): Promise<GroupDto> {
    const group: Group = await this.service.createGroup(createGroupDto);
    return GroupDto.fromEntity(group);
  }

  @Post('/removeGroup/:groupId')
  @ApiOperation({
    summary: 'Remove Group',
    description: 'Remove Group'
  })
  @ApiResponse({
    status: 201,
    type: BaseGroupDto
  })
  async removeGroup(@Param('groupId') groupId: string) {
    return await this.service.removeGroup(groupId);
  }

  @Get('/getGroupsForUser/:userId')
  @ApiOperation({
    summary: 'Get Groups for User',
    description: 'Get Groups for User',
  })
  @ApiResponse({
    status: 200,
    type: [GroupDto],
  })
  async getGroupsForUser(@Param('userId') userId: string): Promise<GroupDto[]> {
    const groups: Group[] = await this.service.getGroupsByUserId(userId);
    return groups.map((group: Group) => GroupDto.fromEntity(group)); 
  }

  @Post('/removeMembers')
  @ApiOperation({
    summary: 'Add Members',
    description: 'Add Members',
  })
  @ApiResponse({
    status: 201,
  })
  async removeMembers(@Body() memberActionDto: MemberActionDto) {
    return await this.service.removeMembers(memberActionDto);
  }

  @Post('/addMembers')
  @ApiOperation({
    summary: 'Add Members',
    description: 'Add Members',
  })
  @ApiResponse({
    status: 201,
  })
  async addMembers(@Body() memberActionDto: MemberActionDto) {
    return await this.service.addMembers(memberActionDto);
  }


  @Put('/:groupId')
  @ApiOperation({
    summary: 'Update Group',
    description: 'Update Group',
  })
  @ApiResponse({
    status: 200,
    type: BaseGroupDto,
  })
  async updateGroup(@Param('groupId') groupId: string, @Body() updateGroupDto: CreateGroupDto): Promise<GroupDto> {
    const group: Group = await this.service.updateGroup(groupId, updateGroupDto);
    return GroupDto.fromEntity(group);
  }


  @Get('/:groupId')
  @ApiOperation({
    summary: 'Get Group by ID',
    description: 'Get Group by ID',
  })
  @ApiResponse({
    status: 200,
    type: GroupDto,
  })
  async getGroupById(@Param('groupId') groupId: string): Promise<GroupDto> {
    const group: Group = await this.service.getGroupById(groupId);
    return GroupDto.fromEntity(group);
  }
}
