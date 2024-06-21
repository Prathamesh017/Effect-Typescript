export interface User{
  id:string;
  user_name:string;
}


export interface Task{
  id:string;
  title:string;
  description:string;
  dueDate:Date,
  status:TaskStatus
  user_id:string
}

export type TaskRequest = Pick<Task, 'title'|'description'|'status'|"dueDate">
export enum TaskStatus{
  TODO="to do",
  INPROGRESS="In Progress", 
  DONE="Done"
}
export enum log {
INFO="INFO",
ERR="ERR"
}