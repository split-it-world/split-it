import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

  @Get('/')
  @ApiOperation({
    summary: 'Get All Users',
    description: 'Get All Users',
  })
  @ApiResponse({
    status: 201,
    type: [UserDto],
  })
  async getAllUsers(): Promise<UserDto[]> {
    const users: User[] = await this.service.findAll();
    return users.map((user: User) => UserDto.fromEntity(user)); 
  }

  @Put('/')
  @ApiOperation({
    summary: 'Create User',
    description: 'Create User',
  })
  @ApiResponse({
    status: 201,
    type: UserDto,
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user: User = await this.service.find(createUserDto);
    return UserDto.fromEntity(user);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get User By Id',
    description: 'Get User By Id',
  })
  @ApiResponse({
    status: 201,
    type: UserDto,
  })
  async getById(@Param('id') userId: string): Promise<UserDto> {
    const user: User = await this.service.findById(userId);
    return UserDto.fromEntity(user);
  }

  @Get('/getFriendsbyUserId/:id')
  @ApiOperation({
    summary: 'Get Friends',
    description: 'Get Friends',
  })
  @ApiResponse({
    status: 201,
    type: [UserDto],
  })
  async getFriends(@Param('id') userId: string): Promise<UserDto[]> {
    return await this.service.getFriendsByUserId(userId);
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

  @Post('/:id')
  @ApiOperation({
    summary: 'Update User',
    description: 'Update User',
  })
  @ApiResponse({
    status: 201,
    type: UserDto,
  })
  async updateUser(@Param('id') userId: string, @Body() updateUserDto: CreateUserDto): Promise<UserDto> {
    const user: User = await this.service.updateUser(userId, updateUserDto);
    return UserDto.fromEntity(user);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Remove User',
    description: 'Remove User',
  })
  @ApiResponse({
    status: 201,
    type: UserDto,
  })
  async removeUser(@Param('id') userId: string): Promise<UserDto> {
    const user: User = await this.service.removeUser(userId);
    return UserDto.fromEntity(user);
  }
}
