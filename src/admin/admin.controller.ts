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
import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiResponse({ type: UserDto })
  create(@Body() dto: CreateUserDto) {
    return this.adminService.create(dto);
  }

  @Get()
  @ApiResponse({ type: UsersPaginated })
  findAll(@Query() q: UserQueryDto) {
    return this.adminService.findAll(q);
  }

  @Get(':id')
  @ApiResponse({ type: UserDto })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ type: UserDto })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.adminService.update(id, dto);
  }

  @Patch(':id/change-password')
  @ApiResponse({ type: UserDto })
  changePassword(@Param('id') id: string, @Body() dto: UpdateUserPasswordDto) {
    return this.adminService.changePassword(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
