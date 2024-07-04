import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ClassMajorCreateDto,
  ClassMajorDto,
  ClassMajorPaginatedDto,
  ClassMajorQuery,
  ClassMajorUpdateDto,
} from 'src/dtos/class-major.dto';
import {
  MajorCreateDto,
  MajorDto,
  MajorQuery,
  MajorUpdateDto,
} from 'src/dtos/major.dto';
import { ClassMajorService } from './class-major.service';

@ApiTags('major')
@Controller('major')
export class MajorController {
  constructor(private readonly classMajorService: ClassMajorService) {}

  @Post('create-major')
  @ApiResponse({ type: MajorDto })
  async create(@Body() dto: MajorCreateDto) {
    return this.classMajorService.majorCreate(dto);
  }

  @Get('get-all-major')
  @ApiResponse({ type: MajorDto })
  async getAll(@Query() q: MajorQuery) {
    return this.classMajorService.listMajor(q);
  }

  @Put('update-major/:id')
  @ApiResponse({ type: MajorDto })
  async update(@Param('id') id: string, @Body() dto: MajorUpdateDto) {
    return this.classMajorService.updateMajor(id, dto.name);
  }

  @Delete('delete-major/:id')
  @ApiResponse({ type: Boolean })
  async delete(@Param('id') id: string) {
    return this.classMajorService.deleteMajor(id);
  }
}

@ApiTags('class-major')
@Controller('class-major')
export class ClassMajorController {
  constructor(private readonly classMajorService: ClassMajorService) {}

  @Post('create-class-major')
  @ApiResponse({ type: ClassMajorDto })
  async create(@Body() dto: ClassMajorCreateDto) {
    return this.classMajorService.classMajorCreate(dto);
  }

  @Get('get-all-class-major')
  @ApiResponse({ type: ClassMajorPaginatedDto })
  async getAll(@Query() q: ClassMajorQuery) {
    return this.classMajorService.listClassMajor(q);
  }

  @Put('update-class-major/:id')
  @ApiResponse({ type: ClassMajorDto })
  async update(@Param('id') id: string, @Body() dto: ClassMajorUpdateDto) {
    return this.classMajorService.updateClassMajor(id, dto);
  }

  @Delete('delete-class-major/:id')
  @ApiResponse({ type: Boolean })
  async delete(@Param('id') id: string) {
    return this.classMajorService.deleteClassMajor(id);
  }
}
