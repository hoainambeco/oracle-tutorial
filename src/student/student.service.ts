import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypes } from 'src/constants';
import { PageMetaDto, UserDto, UserQueryDto, UsersPaginated } from 'src/dtos';
import { Users } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Users)
    private readonly UsersRepository: Repository<Users>,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const user = this.UsersRepository.create(createStudentDto);
    const newUser = await this.UsersRepository.save(user);
    return new UserDto(newUser);
  }

  async findAll(q: UserQueryDto) {
    const qb = this.UsersRepository.createQueryBuilder('users');

    qb.where('users.userType = :userType', { userType: UserTypes.STUDENT });

    const [data, total] = await qb.getManyAndCount();
    const meta = new PageMetaDto({ options: q, total });

    return new UsersPaginated(
      data.map((e) => new UserDto(e)),
      meta,
    );
  }

  async findOne(id: string) {
    const user = await this.UsersRepository.findOne({
      where: { id, userType: UserTypes.STUDENT },
    });
    return new UserDto(user);
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
