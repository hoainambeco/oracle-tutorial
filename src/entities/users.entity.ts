import { StatusAccount } from 'src/constants/status-account';
import { Column, Entity } from 'typeorm';
import { DateEntity } from './with-date.entity';
import { WithId } from './with-id.entity';
@Entity('users')
export class Users extends WithId(DateEntity) {
  @Column({
    nullable: false,
    default: '',
    unique: true,
  })
  username: string;

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
    default: StatusAccount.INACTIVE,
  })
  status: string;
}
