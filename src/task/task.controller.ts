import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { CreateTaskDto } from '../dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private TaskService: TaskService) { }

  @Get()
  getAllTasks(): Task[] {
    return this.TaskService.getAllTasks();
  }

  @Get(':id')
  getTasksbyId(@Param('id') id: string): Task {
    return this.TaskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.TaskService.crateTask(CreateTaskDto);
  }

  // @Put(':id')
  // updateTaskById(@Param('id') id: string,@Body('status') status: string):Task{
  //   return this.TaskService.updateTaskStatusById()
  // }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.TaskService.deleteById(id);
  }
}
