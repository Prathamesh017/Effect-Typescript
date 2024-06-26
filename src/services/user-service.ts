import { Effect } from "effect";
import { Task, TaskRequest, User } from "../common/inteface.ts";
import { v4 as uuidv4 } from 'uuid';

type keyType=keyof User;
export const doesUserExist = (key: keyType, value: User[keyType], users: User[]): Effect.Effect<boolean> => {
  const isUser = users.some(user => user[key] === value);
  return Effect.sync(() => {
    if (isUser) {
      return true;
    }
    return false;
  })
};

export const createUserService = (user_name: string): Effect.Effect<User, never> => {
  const user: User = {
    id: uuidv4(),
    user_name
  }
  return Effect.succeed(user);
};


export const createTaskService = (user_id: string,taskDetails:TaskRequest): Effect.Effect<Task, never> => {
  const task: Task = {
    title:taskDetails.title,
    status:taskDetails.status,
    id:uuidv4(),
    description:taskDetails.description,
    dueDate:taskDetails.dueDate || Date.now(),
    user_id,
  }
  return Effect.succeed(task);
};

export const getAllTasksService=(userId:string,taskId:string|null,tasks:Task[]):Effect.Effect<Task[],Error>=>{
  const userTasks=tasks.filter(task => task.user_id === userId);
  if (taskId) {
    let task=userTasks.find(task => task.id === taskId);
    if(!task){
      return Effect.fail(new Error("Tasks Doesn't Exist"));
    }
    return Effect.succeed([task]);
  }
  return Effect.succeed(userTasks);
}


export const updateTaskService = (task_id:string,user_id: string,taskDetails:TaskRequest,tasks:Task[]): Effect.Effect<Task, Error> => {
  const toUpdatedIndex=tasks.findIndex(task => task.user_id === user_id  && task_id===task.id );
  if(toUpdatedIndex === -1){
    return Effect.fail(new Error("Task Doesn't Exist"));
  }
  const  updatedTask: Task = {
    title:taskDetails.title,
    status:taskDetails.status,
    id:task_id,
    description:taskDetails.description,
    dueDate:taskDetails.dueDate || Date.now(),
    user_id,
  }
  tasks[toUpdatedIndex] = updatedTask;
  return Effect.succeed(updatedTask);
};

export const deleteTaskService=(task_id:string,user_id: string,tasks:Task[]): Effect.Effect<boolean, Error> => {
  const toDeleteIndex=tasks.findIndex(task => task.user_id === user_id  && task_id===task.id);
  if(toDeleteIndex === -1){
    return Effect.fail(new Error("Task Doesn't Exist"));
  }
  tasks.splice(toDeleteIndex,1);
  return Effect.succeed(true);
};