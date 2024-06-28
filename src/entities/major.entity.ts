import { Column, Entity } from 'typeorm';
import { DateDeleteEntity } from './with-date.entity';
import { WithId } from './with-id.entity';

@Entity('major')
export class MajorEntity extends WithId(DateDeleteEntity) {
  @Column()
  name: string;
}
