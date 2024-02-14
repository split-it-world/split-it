import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user-dto';
import { User } from './schemas/user.schema';
import { BaseUserDto } from './dto/base-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FriendActionDto } from './dto/friend-action.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/getAllUsers')
  @ApiOperation({
    summary: 'Get All Users',
    description: 'Get All Users',
  })
  @ApiResponse({
    status: 201,
    type: [UserDto],
  })
  async index(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Post('/findUser')
  @ApiOperation({
    summary: 'Find User',
    description: 'Find User',
  })
  @ApiResponse({
    status: 201,
    type: UserDto,
  })
  async findUser(@Body() user: BaseUserDto): Promise<User> {
    return await this.service.find(user);
  }

  @Get('/getUserById:id')
  @ApiOperation({
    summary: 'Get User By Id',
    description: 'Get User By Id',
  })
  @ApiResponse({
    status: 201,
    type: UserDto,
  })
  async findById(@Param('id') userId: string): Promise<User> {
    return await this.service.findById(userId);
  }

  @Get('/getFriends/:id')
  @ApiOperation({
    summary: 'Get Friends',
    description: 'Get Friends',
  })
  @ApiResponse({
    status: 201,
    type: [UserDto],
  })
  async getFriends(@Param('id') userId: string): Promise<UserDto[]> {
    return await this.service.getFriends(userId);
  }

  @Post('/createUser')
  @ApiOperation({
    summary: 'Create User',
    description: 'Create User',
  })
  @ApiResponse({
    status: 201,
    type: UserDto,
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.service.createUser(createUserDto);
  }

  @Post('/addFriends')
  @ApiOperation({
    summary: 'Add Friends',
    description: 'Add Friends',
  })
  @ApiResponse({
    status: 201,
  })
  async addFriends(@Body() addFriendsDto: FriendActionDto) {
    return await this.service.addFriends(addFriendsDto);
  }

  @Post('/removeFriends')
  @ApiOperation({
    summary: 'Remove Friends',
    description: 'Remove Friends',
  })
  @ApiResponse({
    status: 201,
    type: UserDto,
  })
  async removeFriends(@Body() friendActionDto: FriendActionDto) {
    return await this.service.removeFriends(friendActionDto);
  }
}
