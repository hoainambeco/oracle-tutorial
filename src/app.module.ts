import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseOptions } from './database';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: DatabaseOptions })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
