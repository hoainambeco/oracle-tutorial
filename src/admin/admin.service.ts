import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserTypes } from 'src/constants';
import { PageMetaDto, UserDto, UserQueryDto, UsersPaginated } from 'src/dtos';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from 'src/dtos/update-user.dto';
import { Users } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Users)
    private readonly UsersRepository: Repository<Users>,
  ) {}
  async create(dto: CreateUserDto) {
    const user = this.UsersRepository.create(dto);
    const newUser = await this.UsersRepository.save(user);
    return new UserDto(newUser);
  }

  async findAll(q: UserQueryDto) {
    const qb = this.UsersRepository.createQueryBuilder('users');

    qb.where('users.userType = :userType', { userType: UserTypes.ADMIN });

    const [data, total] = await qb.getManyAndCount();
    const meta = new PageMetaDto({ options: q, total });

    return new UsersPaginated(
      data.map((e) => new UserDto(e)),
      meta,
    );
  }

  async findOne(id: string) {
    const user = await this.UsersRepository.findOne({
      where: { id, userType: UserTypes.ADMIN },
    });
    return new UserDto(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.UsersRepository.findOne({
      where: { id, userType: UserTypes.ADMIN },
    });

    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, dto);
    await this.UsersRepository.save(user);
    return new UserDto(user);
  }

  async changePassword(id: string, dto: UpdateUserPasswordDto) {
    const user = await this.UsersRepository.findOne({
      where: { id, userType: UserTypes.ADMIN },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (dto.newPassword !== dto.confirmPassword) {
      throw new Error('Password not match');
    }

    if (dto.oldPassword !== user.password) {
      throw new Error('Old password is incorrect');
    }
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(dto.newPassword, salt);
    await this.UsersRepository.save(user);
    return new UserDto(user);
  }

  async remove(id: string) {
    await this.UsersRepository.delete(id);

    return { message: 'User deleted successfully' };
  }
}
