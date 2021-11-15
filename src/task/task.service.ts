import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskRespository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRespository)
    private taskRespository: TaskRespository
  ) { }

  async getTaskByID(id: string): Promise<Task> {
    const found = await this.taskRespository.findOne(id);
    if (!found) {
      throw new NotFoundException(`the Task with the ID: ${id} don't found `);
    }
    return found;
  }

  createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRespository.createTask(CreateTaskDto);
  }

  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

 
  // updateTaskStatusById(id, TaskStatus) {
  // let changes: Task;
  // this.tasks.map((task) => {
  //   if (task.id === id) {
  //     task.status = TaskStatus;
  //     changes = task;
  //   }
  // });
  //   const changes = this.getTaskById(id);
  //   changes.status = TaskStatus;
  //   return changes;
  // }

  // deleteById(id: string) {
  //   const found = this.getTaskById(id);
  //   const toDelete = this.tasks.findIndex(task => task.id === found.id);
  //   return this.tasks.splice(toDelete, 1);
  // }
}
