import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';
import { User } from '../schemas/user.schema';

export class UserDto extends BaseUserDto {
  @ApiProperty()
  id: string;

  static fromEntity(user: User): UserDto {
    const { id, name, email, phoneNumber, friends, groups } = user;
    const userDto = new UserDto();
    userDto.id = id;
    userDto.name = name;
    userDto.email = email;
    userDto.phoneNumber = phoneNumber;
    return userDto;
  }
}
