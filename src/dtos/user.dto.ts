import { ApiProperty } from '@nestjs/swagger';
import { PageQueryDto, Paginate } from 'src/dtos';
import { Users } from 'src/entities';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  userType: string;

  @ApiProperty()
  status: string;

  constructor(user: Users) {
    this.id = user.id;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.fullName = user.fullName;
    this.email = user.email;
    this.code = user.code;
    this.birthDate = user.birthDate;
    this.gender = user.gender;
    this.userType = user.userType;
    this.status = user.status;
  }
}
export class UsersPaginated extends Paginate(UserDto) {}
export class UserQueryDto extends PageQueryDto {}
