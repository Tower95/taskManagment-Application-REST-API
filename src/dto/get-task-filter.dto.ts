import { TaskStatus } from "src/task/task.model";

export class GetTaskFilterDto{
  status: TaskStatus;
  search: string;
}