import { EntityRepository, Repository } from "typeorm";
import { Task } from './task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDto } from '../dto/get-task-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRespository extends Repository<Task>{
  async createTask(CreateTaskDto: CreateTaskDto, user:User): Promise<Task> {
    const { title, description } = CreateTaskDto
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    })
    const create = await this.save(task);
    return task;
  }

  async getTasks(filterDto: GetTaskFilterDto,user:User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where({user});

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search)',
        { search: `%${search.toLowerCase()}%`});

    }
    const tasks = await query.getMany();
    return tasks;
  }
}