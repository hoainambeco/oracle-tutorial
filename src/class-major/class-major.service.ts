import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ClassMajorCreateDto,
  ClassMajorDto,
  ClassMajorQuery,
  ClassMajorUpdateDto,
} from 'src/dtos/class-major.dto';
import { MajorCreateDto, MajorDto, MajorQuery } from 'src/dtos/major.dto';
import { ClassMajorEntity, MajorEntity, Users } from 'src/entities';
import { In, Repository } from 'typeorm';

@Injectable()
export class ClassMajorService {
  constructor(
    @InjectRepository(ClassMajorEntity)
    private readonly classMajorRepository: Repository<ClassMajorEntity>,

    @InjectRepository(MajorEntity)
    private readonly majorRepository: Repository<MajorEntity>,

    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async majorCreate(dto: MajorCreateDto) {
    const major = this.majorRepository.create({
      name: dto.name,
    });

    await this.majorRepository.save(major);
    return new MajorDto(major);
  }

  async listMajor(q: MajorQuery) {
    const query = this.majorRepository.createQueryBuilder('major');
    query.where('major.deletedAt IS NULL');
    if (q.id) {
      query.andWhere('major.id = :id', { id: q.id });
    }
    if (q.keyword) {
      query.andWhere('major.name like= :name', { name: q.keyword });
    }
    const majors = await query.getMany();
    return majors.map((major) => new MajorDto(major));
  }

  async updateMajor(id: string, name: string) {
    const major = await this.majorRepository.findOne({ where: { id: id } });
    major.name = name;
    return this.majorRepository.save(major);
  }

  async deleteMajor(id: string) {
    return (await this.majorRepository.delete(id)) ? true : false;
  }

  // ===============================================

  async classMajorCreate(dto: ClassMajorCreateDto) {
    const major = await this.majorRepository.findOne({
      where: { id: dto.majorId },
    });

    const users = await this.usersRepository.find({
      where: { id: In(dto.users) },
    });
    const classMajor = this.classMajorRepository.create({
      name: dto.name,
      major: major,
      users: users,
    });

    await this.classMajorRepository.save(classMajor);
    return new ClassMajorDto(classMajor);
  }

  async listClassMajor(q: ClassMajorQuery) {
    const query = this.classMajorRepository
      .createQueryBuilder('class_major')
      .leftJoinAndSelect('class_major.major', 'major')
      .leftJoinAndSelect('class_major.users', 'users');
    query.where('major.deletedAt IS NULL');
    if (q.id) {
      query.andWhere('major.id = :id', { id: q.id });
    }
    if (q.keyword) {
      query.andWhere('major.name like= :name', { name: q.keyword });
    }
    const majors = await query.getMany();
    return majors.map((major) => new ClassMajorDto(major));
  }

  async updateClassMajor(id: string, dto: ClassMajorUpdateDto) {
    const classMajor = await this.classMajorRepository.findOne({
      where: { id: id },
    });
    if (dto.name) {
      classMajor.name = dto.name;
    }
    if (dto.majorId) {
      const major = await this.majorRepository.findOne({
        where: { id: dto.majorId },
      });
      classMajor.major = major;
    }
    if (dto.users) {
      const users = await this.usersRepository.find({
        where: { id: In(dto.users) },
      });
      classMajor.users = users;
    }
    return this.classMajorRepository.save(classMajor);
  }

  async deleteClassMajor(id: string) {
    return (await this.classMajorRepository.delete(id)) ? true : false;
  }
}
