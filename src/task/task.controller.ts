import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTaskFilterDto } from '../dto/get-task-filter.dto';
import { UpdateTaskStatuskDto } from '../dto/update-task-dto';

@Controller('task')
export class TaskController {
  constructor(private TaskService: TaskService) { }

  private getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto

    let tasks = this.TaskService.getAllTasks();
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.toLowerCase().includes(search) || task.description.includes(search)) {
          return true;
        } else {
          return false;
        }
      }
      );
    }
    return tasks;
  }

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.getTaskWithFilters(filterDto);
    } else {
      return this.TaskService.getAllTasks();
    }
  }

  @Get(':id')
  getTasksbyId(@Param('id') id: string): Task {
    return this.TaskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.TaskService.crateTask(CreateTaskDto);
  }

  @Put(':id/status')
  updateTaskById(@Param('id') id: string, @Body() UpdateTaskStatusDto: UpdateTaskStatuskDto): Task {
    const { status } = UpdateTaskStatusDto;
    console.log(status);
    return this.TaskService.updateTaskStatusById(id, status);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.TaskService.deleteById(id);
  }
}
