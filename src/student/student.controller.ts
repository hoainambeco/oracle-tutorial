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
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from '../dtos/update-user.dto';
import { StudentService } from './student.service';

@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiResponse({ type: UserDto })
  create(@Body() createStudentDto: CreateUserDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiResponse({ type: UsersPaginated })
  findAll(@Query() q: UserQueryDto) {
    return this.studentService.findAll(q);
  }

  @Get(':id')
  @ApiResponse({ type: UserDto })
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ type: UserDto })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateUserDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Patch(':id/change-password')
  @ApiResponse({ type: UserDto })
  changePassword(
    @Param('id') id: string,
    @Body() updateStudentPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.studentService.changePassword(id, updateStudentPasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
