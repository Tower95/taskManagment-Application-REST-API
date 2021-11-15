import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskRespository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UpdateTaskStatuskDto } from '../dto/update-task-dto';
import { GetTaskFilterDto } from '../dto/get-task-filter.dto';

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

  getTasks(filterDto:GetTaskFilterDto):Promise<Task[]>{
    return this.taskRespository.getTasks(filterDto);
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

  async updateTaskStatusById(id:string,status:TaskStatus):Promise<Task>{
    const task =  await this.getTaskByID(id);
    task.status = status;
    await this.taskRespository.save(task);
    return task;
  }


  async deleteById(id: string): Promise<Task> {
    const task = await this.getTaskByID(id);
    this.taskRespository.delete({ id: task.id });
    return task;
  }
}
