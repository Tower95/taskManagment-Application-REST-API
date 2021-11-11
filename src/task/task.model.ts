export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  INPROGRES = 'INPROGRES',
  DONE = 'DONE',
}