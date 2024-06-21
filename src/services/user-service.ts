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
      throw new Error("Tasks Doesn't Exist");
    }
    return Effect.succeed([task]);
  }
  return Effect.succeed(userTasks);
}