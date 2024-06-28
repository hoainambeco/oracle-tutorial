import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MajorEntity } from './major.entity';
import { DateDeleteEntity } from './with-date.entity';
import { WithId } from './with-id.entity';

@Entity('subject')
export class SubjectEntity extends WithId(DateDeleteEntity) {
  @ManyToOne(() => MajorEntity, { nullable: true })
  @JoinColumn({ name: 'major_id' })
  major: MajorEntity;

  @Column({
    nullable: true,
  })
  name: string;
}
