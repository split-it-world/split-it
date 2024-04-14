
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, MongooseError, Types } from 'mongoose';
import { BaseUserDto } from './dto/base-user.dto';
import { UserDto } from './dto/user-dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FriendActionDto } from './dto/friend-action.dto';
import { ArgumentOutOfRangeError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this.userModel.find().exec();
      return users;
    } catch (e: any) {
      throw new MongooseError(e.message);
    }
  }
  
  async find(user: BaseUserDto): Promise<User> {
    try {
      return await this.userModel.findOne(user);
    } catch (e: any) {
      throw new MongooseError(e.message);
    }
  }
  
  async findById(userId: string): Promise<User> {
    try {
      return await this.userModel.findById(userId);
    } catch (e: any) {
      throw new MongooseError(e.message);
    }
  }
  
  async findByIds(userIds: string[]): Promise<User[]> {
    try {
      return await this.userModel.find({
        _id: { $in: userIds.map((id) => new Types.ObjectId(id)) },
      }).exec();
    } catch (e: any) {
      throw new MongooseError(e.message);
    }
  }
  
  async getFriendsForUser(userId: string): Promise<UserDto[]> {
    try {
      const user: User = await this.userModel.findById(userId).lean();
      const friendList: User[] = await this.userModel
        .find({
          _id: { $in: user.friends },
        })
        .lean();
      const friendDtoList: UserDto[] = friendList.map((friend) => ({
        id: friend.id,
        name: friend.name,
        email: friend.email,
        phoneNumber: friend.phoneNumber,
      }));
      return friendDtoList;
    } catch (e: any) {
      throw new MongooseError(e.message);
    }
  }
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser: User = await this.userModel.findOne(createUserDto).lean();
      if (existingUser) {
        return null;
      }
      const createdUser: User = await this.userModel.create(createUserDto);
      return createdUser;
    } catch (e: any) {
      throw new MongooseError(e.message);
    }
  }
  
  async addFriends(friendActionDto: FriendActionDto) {
    try {
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
    } catch (e: any) {
      throw new MongooseError(e.message);
    }
  }
  
  async removeFriends(friendActionDto: FriendActionDto) {
    try {
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
    } catch (e: any) {
      throw new MongooseError(e.message);
    }
  }
  
  async updateUser(userId: string, updateUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.findOneAndReplace({ _id: userId }, updateUserDto, {new: true});
    } catch (e: any) {
      throw new MongooseError(e.message);
    }
  }
  
  async removeUser(userId: string): Promise<User> {
    try {
      return await this.userModel.findByIdAndDelete(userId);
    } catch (e: any) {
      throw new MongooseError(e.message);
    }
  }
}

