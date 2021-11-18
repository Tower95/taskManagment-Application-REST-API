import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTaskFilterDto } from '../dto/get-task-filter.dto';
import { UpdateTaskStatuskDto } from '../dto/update-task-dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import {Logger} from '@nestjs/common';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {

  private logger = new Logger('TasksController');
  constructor(private TaskService: TaskService) { }

  @Get()
  getTasks(
    @Query()
    filterDto: GetTaskFilterDto,
    @GetUser()
    user: User
  ): Promise<Task[]> {

    this.logger.verbose(`User:"${user.username}" retrieving all task. Filters: ${JSON.stringify(filterDto)}`);

    return this.TaskService.getTasks(filterDto, user);

  }

  @Get(':id')
  GetTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.TaskService.getTaskByID(id, user);
  }

  @Post()
  createTask(
    @Body()
    CreateTaskDto: CreateTaskDto,
    @GetUser()
    user: User
  ): Promise<Task> {
    this.logger.verbose(`User:"${user.username}" create Task:"${CreateTaskDto.title}"`)
    return this.TaskService.createTask(CreateTaskDto, user);
  }

  @Put(':id/status')
  updateTaskById(@Param('id') id: string, @Body() UpdateTaskStatusDto: UpdateTaskStatuskDto, @GetUser() user: User): Promise<Task> {
    const { status } = UpdateTaskStatusDto;
    return this.TaskService.updateTaskStatusById(id, status, user);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @GetUser() user: User) {
    return this.TaskService.deleteById(id, user);
  }
}
