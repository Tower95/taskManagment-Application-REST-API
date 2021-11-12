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

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
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
    let changes: Task;
    this.tasks.map((task) => {
      if (task.id === id) {
        task.status = TaskStatus;
        changes = task;
      }
    });
    return changes;
  }

  deleteById(id: string) {
    const toDelete = this.tasks.findIndex(task => task.id === id);
    return this.tasks.splice(toDelete, 1);
  }
}
