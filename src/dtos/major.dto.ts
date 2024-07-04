import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { MajorEntity } from 'src/entities';
import { PageQueryDto, Paginate } from './pagination.dto';

export class MajorDto {
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

  constructor(major: MajorEntity) {
    this.id = major.id;
    this.createdAt = major.createdAt;
    this.updatedAt = major.updatedAt;
    this.deletedAt = major.deletedAt;
    this.name = major.name;
  }
}

export class MajorQuery extends PageQueryDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  id: string;
}
export class MajorPaginatedDto extends Paginate(MajorDto) {}

export class MajorCreateDto {
  @ApiProperty()
  @IsString()
  name: string;
}

export class MajorUpdateDto {
  @ApiProperty()
  @IsString()
  name: string;
}

export class MajorDeleteDto {
  @ApiProperty()
  id: string;
}
