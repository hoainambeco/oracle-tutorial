import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CreateDateEntity {
  @CreateDateColumn({ type: 'timestamp with local time zone' })
  createdAt: Date;
}

@Entity()
export class DateEntity extends CreateDateEntity {
  @UpdateDateColumn({ type: 'timestamp with local time zone' })
  updatedAt: Date;
}

@Entity()
export class DateDeleteEntity extends DateEntity {
  @DeleteDateColumn({ type: 'timestamp with local time zone' })
  deletedAt: Date;
}
