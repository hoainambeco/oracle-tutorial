import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClassMajorEntity,
  MajorEntity,
  SubjectEntity,
  Users,
} from 'src/entities';
import { SubjectScoreEntity } from 'src/entities/subjectScore.entity';
import {
  ClassMajorController,
  MajorController,
} from './class-major.controller';
import { ClassMajorService } from './class-major.service';

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
  controllers: [ClassMajorController, MajorController],
  providers: [ClassMajorService],
})
export class ClassMajorModule {}
