import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task/task-status.enum';

export class UpdateTaskStatuskDto{

  @IsEnum(TaskStatus)
  status: TaskStatus;

}