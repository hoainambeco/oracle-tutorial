import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from 'src/constants';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  birthday: Date;

  @ApiPropertyOptional({ enum: Gender, default: Gender.MALE })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
}
export class UpdateUserPasswordDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  newPassword: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  confirmPassword: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  oldPassword: string;
}
