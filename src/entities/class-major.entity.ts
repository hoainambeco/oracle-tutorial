import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MajorEntity } from './major.entity';
import { DateDeleteEntity } from './with-date.entity';
import { WithId } from './with-id.entity';

@Entity('class_major')
export class ClassMajorEntity extends WithId(DateDeleteEntity) {
  @Column()
  name: string;

  @ManyToOne(() => MajorEntity, { nullable: true })
  @JoinColumn({ name: 'major_id' })
  major: MajorEntity;
}
