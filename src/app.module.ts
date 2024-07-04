import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseOptions } from './database';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { AdminModule } from './admin/admin.module';
import { ClassMajorModule } from './class-major/class-major.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: DatabaseOptions }),
    StudentModule,
    TeacherModule,
    AdminModule,
    ClassMajorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
