import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task/task.model';

export class UpdateTaskStatuskDto{

  @IsEnum(TaskStatus)
  status: TaskStatus;

}