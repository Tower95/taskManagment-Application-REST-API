import { Injectable, NotFoundException } from '@nestjs/common';

import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const found =  this.tasks.find(task => task.id === id);
    if(!found){
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return found;
  }

  crateTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task);
    return task;
  }

  updateTaskStatusById(id, TaskStatus) {
    // let changes: Task;
    // this.tasks.map((task) => {
    //   if (task.id === id) {
    //     task.status = TaskStatus;
    //     changes = task;
    //   }
    // });
    const changes = this.getTaskById(id);
    changes.status = TaskStatus;
    return changes;
  }

  deleteById(id: string) {
    const found = this.getTaskById(id);
    const toDelete = this.tasks.findIndex(task => task.id === found.id);
    return this.tasks.splice(toDelete, 1);
  }
}
