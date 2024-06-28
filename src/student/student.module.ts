import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClassMajorEntity,
  MajorEntity,
  SubjectEntity,
  Users,
} from 'src/entities';
import { SubjectScoreEntity } from 'src/entities/subjectScore.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

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
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
