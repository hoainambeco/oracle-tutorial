import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SubjectEntity } from './subject.entity';
import { Users } from './users.entity';
import { DateDeleteEntity } from './with-date.entity';
import { WithId } from './with-id.entity';

@Entity('subject_score')
export class SubjectScoreEntity extends WithId(DateDeleteEntity) {
  @ManyToOne(() => Users, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => SubjectEntity, { nullable: true })
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @Column({
    type: 'float',
    nullable: false,
    default: 0,
  })
  score: number;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  coefficient: string;
}
