import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user-dto';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { FriendActionDto } from './dto/friend-action.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly service: UsersService) { }

  
  @Get('/')
  @ApiOperation({
    summary: 'Get All Users',
    description: 'Get All Users',
  })
  @ApiResponse({
    status: 200,
    type: [UserDto],
  })
  async getAllUsers(): Promise<UserDto[]> {
    try {
      const users: User[] = await this.service.findAll();
      return users.map((user: User) => UserDto.fromEntity(user));
    } catch (error: any) {
      // Handle error
      throw new Error('Failed to get all users');
    }
  }

  @Put('/')
  @ApiOperation({
    summary: 'Create User',
    description: 'Create User',
  })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const user: User = await this.service.createUser(createUserDto);
      return UserDto.fromEntity(user);
    } catch (error: any) {
      // Handle error
      throw new Error('Failed to create user');
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get User By Id',
    description: 'Get User By Id',
  })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  async getById(@Param('id') userId: string): Promise<UserDto> {
    try {
      const user: User = await this.service.findById(userId);
      return UserDto.fromEntity(user);
    } catch (error: any) {
      // Handle error
      throw new Error('Failed to get user by ID');
    }
  }

  @Get('/getFriendsForUser/:id')
  @ApiOperation({
    summary: 'Get Friends for User',
    description: 'Get Friends for User',
  })
  @ApiResponse({
    status: 200,
    type: [UserDto],
  })
  async getFriendsForUser(@Param('id') userId: string): Promise<UserDto[]> {
    try {
      return await this.service.getFriendsForUser(userId);
    } catch (error: any) {
      // Handle error
      throw new Error('Failed to get friends for user');
    }
  }

  @Post('/addFriends')
  @ApiOperation({
    summary: 'Add Friends',
    description: 'Add Friends',
  })
  @ApiResponse({
    status: 200,
  })
  async addFriends(@Body() addFriendsDto: FriendActionDto) {
    try {
      await this.service.addFriends(addFriendsDto);
    } catch (error: any) {
      // Handle error
      throw new Error('Failed to add friends');
    }
  }

  @Post('/removeFriends')
  @ApiOperation({
    summary: 'Remove Friends',
    description: 'Remove Friends',
  })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  async removeFriends(@Body() friendActionDto: FriendActionDto) {
    try {
      await this.service.removeFriends(friendActionDto);
    } catch (error: any) {
      // Handle error
      throw new Error('Failed to remove friends');
    }
  }

  @Post('/:id')
  @ApiOperation({
    summary: 'Update User',
    description: 'Update User',
  })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  async updateUser(@Param('id') userId: string, @Body() updateUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const user: User = await this.service.updateUser(userId, updateUserDto);
      return UserDto.fromEntity(user);
    } catch (error: any) {
      // Handle error
      throw new Error('Failed to update user');
    }
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Remove User',
    description: 'Remove User',
  })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  async removeUser(@Param('id') userId: string): Promise<UserDto> {
    try {
      const user: User = await this.service.removeUser(userId);
      return UserDto.fromEntity(user);
    } catch (error: any) {
      // Handle error
      throw new Error('Failed to remove user');
    }
  }
}