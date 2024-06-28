import {
  ClassMajorEntity,
  MajorEntity,
  SubjectEntity,
  Users,
} from 'src/entities';
import { SubjectScoreEntity } from 'src/entities/subjectScore.entity';
import { DataSource } from 'typeorm';
import { makeTypeormOptions } from './helper';

export default new DataSource({
  ...makeTypeormOptions(),
  migrations: ['migrations/*{.ts,.js}'],
  entities: [
    Users,
    SubjectEntity,
    MajorEntity,
    ClassMajorEntity,
    SubjectScoreEntity,
  ],
  // entities: ['./src/entities/*.entity{.ts,.js}'],
});
