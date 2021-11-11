import { Injectable } from '@nestjs/common';

import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id:string):Task {
    return this.tasks.find(task => task.id === id);
  }

  crateTask(CreateTaskDto: CreateTaskDto):Task {
    const {title, description} = CreateTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task);
    return task;
  }

  // updateTaskStatusById(id,TaskStatus){
  //   const toUpdate = this.tasks.map(task => task.id === id);
  //   this.tasks.s
  // }
  deleteById(id:string){
    const toDelete = this.tasks.findIndex(task => task.id === id);
    return this.tasks.splice(toDelete,1);
  }
}
