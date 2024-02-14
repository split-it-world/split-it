import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { BaseUserDto } from './dto/base-user.dto';
import { UserDto } from './dto/user-dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FriendActionDto } from './dto/friend-action.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async find(user: BaseUserDto): Promise<User> {
    return await this.userModel.findOne(user);
  }

  async findById(userId: string): Promise<User> {
    return await this.userModel.findById(userId);
  }

  async findByIds(userIds: string[]): Promise<User[]> {
    return await this.userModel.find({
      _id: { $in: userIds.map((id) => new Types.ObjectId(id)) },
    });
  }

  async getFriends(userId: string): Promise<UserDto[]> {
    const user: UserDto = await this.userModel.findById(userId).lean();
    const friendList: UserDto[] = await this.userModel
      .find({
        _id: { $in: user.friends },
      })
      .lean();
    return friendList;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne(createUserDto).lean();
    if (existingUser) {
      return null;
    }
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async addFriends(friendActionDto: FriendActionDto) {
    const user: User = await this.userModel
      .findById(friendActionDto.userId)
      .lean();
    if (
      friendActionDto.friendIds.some((friendId) => {
        user.friends.includes(new Types.ObjectId(friendId));
      })
    ) {
      return null;
    }
    user.friends.push(
      ...friendActionDto.friendIds.map(
        (friendId) => new Types.ObjectId(friendId)
      )
    );
    await this.userModel.findOneAndReplace(
      { _id: friendActionDto.userId },
      user
    );
  }

  async removeFriends(friendActionDto: FriendActionDto) {
    const user: User = await this.userModel
      .findById(friendActionDto.userId)
      .lean();
    if (
      friendActionDto.friendIds.some((friendId) => {
        !user.friends.includes(new Types.ObjectId(friendId));
      })
    ) {
      return null;
    }
    user.friends = user.friends.filter((friend) =>
      friendActionDto.friendIds
        .map((friendId) => new Types.ObjectId(friendId))
        .includes(friend)
    );
    await this.userModel.findOneAndReplace(
      { _id: friendActionDto.userId },
      user
    );
  }

  async updateUser(user: User) {
    await this.userModel.findOneAndReplace({ _id: user._id }, user);
  }
}
