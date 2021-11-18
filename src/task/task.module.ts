import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRespository } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TaskController],
  imports: [
    TypeOrmModule.forFeature([TaskRespository]),
    AuthModule
  ],
  providers: [TaskService]
})
export class TaskModule { }
