import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto, UserQueryDto, UsersPaginated } from 'src/dtos';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from 'src/dtos/update-user.dto';
import { TeacherService } from './teacher.service';

@ApiTags('teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @ApiResponse({ type: UserDto })
  create(@Body() dto: CreateUserDto) {
    return this.teacherService.create(dto);
  }

  @Get()
  @ApiResponse({ type: UsersPaginated })
  findAll(@Query() q: UserQueryDto) {
    return this.teacherService.findAll(q);
  }

  @Get(':id')
  @ApiResponse({ type: UserDto })
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ type: UserDto })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.teacherService.update(id, dto);
  }

  @Patch(':id/change-password')
  @ApiResponse({ type: UserDto })
  changePassword(@Param('id') id: string, @Body() dto: UpdateUserPasswordDto) {
    return this.teacherService.changePassword(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  }
}
