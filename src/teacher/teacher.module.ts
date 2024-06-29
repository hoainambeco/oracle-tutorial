import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClassMajorEntity,
  MajorEntity,
  SubjectEntity,
  Users,
} from 'src/entities';
import { SubjectScoreEntity } from 'src/entities/subjectScore.entity';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      SubjectEntity,
      MajorEntity,
      ClassMajorEntity,
      SubjectScoreEntity,
    ]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
