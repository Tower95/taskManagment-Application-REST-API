import { EntityRepository, Repository } from "typeorm";
import { Task } from './task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDto } from '../dto/get-task-filter.dto';

@EntityRepository(Task)
export class TaskRespository extends Repository<Task>{
  async createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = CreateTaskDto
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN
    })
    const create = await this.save(task);
    return task;
  }

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search',
        { search: `%${search.toLowerCase()}%`});

    }
    const tasks = await query.getMany();
    return tasks;
  }
}