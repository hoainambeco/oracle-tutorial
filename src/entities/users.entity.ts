import * as bcrypt from 'bcrypt';
import { Gender, UserTypes } from 'src/constants';
import { StatusAccount } from 'src/constants/status-account';
import { newCode } from 'src/utils';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ClassMajorEntity } from './class-major.entity';
import { DateEntity } from './with-date.entity';
import { WithId } from './with-id.entity';

@Entity('users')
export class Users extends WithId(DateEntity) {
  @Column({
    nullable: false,
    default: '',
    unique: false,
  })
  fullName: string;

  @Column({
    nullable: false,
    default: '',
    unique: true,
  })
  code: string;

  @Column({
    nullable: false,
    default: '',
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    nullable: true,
    default: '',
    type: 'timestamp with local time zone',
  })
  birthDate: Date;

  @Column({
    nullable: true,
    default: Gender.MALE,
  })
  gender: string;

  @Column({
    nullable: true,
    default: UserTypes.STUDENT,
  })
  userType: string;

  @Column({
    nullable: true,
    default: StatusAccount.INACTIVE,
  })
  status: string;

  @ManyToOne(() => ClassMajorEntity)
  @JoinColumn({ name: 'class_major_id' })
  classMajor: ClassMajorEntity;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  @BeforeInsert()
  async genCode() {
    this.code = newCode();
  }
}
