import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClassMajorEntity,
  MajorEntity,
  SubjectEntity,
  Users,
} from 'src/entities';
import { SubjectScoreEntity } from 'src/entities/subjectScore.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

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
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
