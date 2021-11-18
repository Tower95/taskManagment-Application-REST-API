import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskRespository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UpdateTaskStatuskDto } from '../dto/update-task-dto';
import { GetTaskFilterDto } from '../dto/get-task-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TaskService {
  
  constructor(
    @InjectRepository(TaskRespository)
    private taskRespository: TaskRespository
  ) { }

  async getTaskByID(id: string, user:User): Promise<Task> {
    const found = await this.taskRespository.findOne({where:{ id, user}});
    if (!found) {
      throw new NotFoundException(`the Task with the ID: ${id} don't found `);
    }
    return found;
  }

  createTask(CreateTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRespository.createTask(CreateTaskDto, user);
  }

  getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRespository.getTasks(filterDto, user);
  }


  async updateTaskStatusById(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskByID(id,user);
    task.status = status; 
    await this.taskRespository.save(task);
    return task;
  }


  async deleteById(id: string,user:User): Promise<Task> {
    const task = await this.getTaskByID(id,user);
    this.taskRespository.delete({ id ,user});
    return task;
  }
}
