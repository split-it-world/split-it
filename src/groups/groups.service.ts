import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schemas/group.schema';
import { Model, Types } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { MemberActionDto } from './dto/member-action.dto';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
    private readonly userService: UsersService
  ) {}

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const existingGroup = await this.groupModel.findOne(createGroupDto).exec();
    if (existingGroup) {
      return null;
    }
    const createdGroup = await this.groupModel.create(createGroupDto);
    return createdGroup;
  }

  async getAllGroups(): Promise<Group[]> {
    return await this.groupModel.find();
  }

  async removeMembers(memberActionDto: MemberActionDto) {
    const group: Group = await this.groupModel.findById(
      memberActionDto.groupId
    );
    const members: User[] = await this.userService.findByIds(
      memberActionDto.memberIds
    );
    group.members = group.members.filter((memberId) => {
      memberActionDto.memberIds.includes(memberId.toString());
    });
    await this.groupModel.findOneAndReplace(
      { _id: memberActionDto.groupId },
      group
    );
    members.forEach((member: User) => {
      member.groups = member.groups.filter(
        (groupId) => groupId.toString() != memberActionDto.groupId
      );
      this.userService.updateUser(member);
    });
  }

  async addMembers(memberActionDto: MemberActionDto) {
    const group: Group = await this.groupModel.findById(
      memberActionDto.groupId
    );
    const members: User[] = await this.userService.findByIds(
      memberActionDto.memberIds
    );
    group.members.push(
      ...memberActionDto.memberIds.map((id) => new Types.ObjectId(id))
    );
    await this.groupModel.findOneAndReplace(
      { _id: memberActionDto.groupId },
      group
    );
    members.forEach((member: User) => {
      member.groups.push(new Types.ObjectId(memberActionDto.groupId));
      this.userService.updateUser(member);
    });
  }
}
