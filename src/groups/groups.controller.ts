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

  @Get('/')
  @ApiOperation({
    summary: 'Get All Groups',
    description: 'Get All Groups',
  })
  @ApiResponse({
    status: 201,
    type: [BaseGroupDto],
  })
  async getAllGroups(): Promise<GroupDto[]> {
    return (await this.service.getAllGroups()).map((group: Group) => group.toDto());
  }

  @Put('/')
  @ApiOperation({
    summary: 'Create New Group',
    description: 'Create New Group',
  })
  @ApiResponse({
    status: 201,
    type: BaseGroupDto,
  })
  async createGroup(createGroupDto: CreateGroupDto): Promise<GroupDto> {
    return (await this.service.createGroup(createGroupDto)).toDto();
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

  @Get('/getGroupsByUserId/:userId')
  @ApiOperation({
    summary: 'Get Groups by User ID',
    description: 'Get Groups by User ID',
  })
  @ApiResponse({
    status: 200,
    type: [GroupDto],
  })
  async getGroupsByUserId(@Param('userId') userId: string): Promise<GroupDto[]> {
    return (await this.service.getGroupsByUserId(userId)).map((group: Group) => group.toDto());
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
    return (await this.service.updateGroup(groupId, updateGroupDto)).toDto();
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
    return (await this.service.getGroupById(groupId)).toDto();
  }
}
