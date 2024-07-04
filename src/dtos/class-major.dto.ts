import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { ClassMajorEntity } from 'src/entities';
import { MajorDto } from './major.dto';
import { PageQueryDto, Paginate } from './pagination.dto';
import { UserDto } from './user.dto';

export class ClassMajorCreateDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  majorId: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiPropertyOptional()
  users: string[];
}

export class ClassMajorUpdateDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  majorId: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiPropertyOptional()
  users: string[];
}
export class ClassMajorQuery extends PageQueryDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  id: string;
}

export class ClassMajorDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  major: MajorDto;

  @ApiPropertyOptional()
  users: UserDto[];

  constructor(partial: ClassMajorEntity) {
    this.id = partial.id;
    this.createdAt = partial.createdAt;
    this.updatedAt = partial.updatedAt;
    this.deletedAt = partial.deletedAt;
    this.name = partial.name;
    this.major = new MajorDto(partial.major);
    this.users = partial.users.map((user) => new UserDto(user));
  }
}
export class ClassMajorPaginatedDto extends Paginate(ClassMajorDto) {}
