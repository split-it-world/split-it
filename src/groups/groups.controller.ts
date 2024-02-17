import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { BaseGroupDto } from './dto/base-group.dto';
import { Group } from './schemas/group.schema';
import { MemberActionDto } from './dto/member-action.dto';

@Controller('groups')
@ApiTags('groups')
export class GroupsController {
  constructor(private readonly service: GroupsService) {}

  @Get('/getAllGroups')
  @ApiOperation({
    summary: 'Get All Groups',
    description: 'Get All Groups',
  })
  @ApiResponse({
    status: 201,
    type: [BaseGroupDto],
  })
  async getAllGroups(): Promise<Group[]> {
    return await this.service.getAllGroups();
  }

  @Post('/createGroup')
  @ApiOperation({
    summary: 'Create New Group',
    description: 'Create New Group',
  })
  @ApiResponse({
    status: 201,
    type: BaseGroupDto,
  })
  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    return await this.service.createGroup(createGroupDto);
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
}
