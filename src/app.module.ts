import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseOptions } from './database';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: DatabaseOptions }),
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
