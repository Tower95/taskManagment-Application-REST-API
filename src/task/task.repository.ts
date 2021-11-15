import { EntityRepository, Repository } from "typeorm";
import { Task } from './task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from "./task-status.enum";

@EntityRepository(Task)
export class TaskRespository extends Repository<Task>{
  async createTask(CreateTaskDto:CreateTaskDto):Promise<Task>{
    const { title, description } = CreateTaskDto
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN
    })
    const create = await this.save(task);
    return task;
  }
}