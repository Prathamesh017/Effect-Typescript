
import {Task, User} from "../common/inteface.ts";
import { Request, Response } from "express";
import {createTaskService, createUserService,doesUserExist, getAllTasksService, updateTaskService } from "../services/user-service.ts";
import { Effect, Exit } from "effect";
import { isUUID } from "../common/utitlies.ts";
const users: User[] = [];
const tasks:Task[]=[];

export function createUser(req: Request, res: Response){
  try {
    const { user_name } = req.body;
    const isUserExist = Effect.runSync(doesUserExist("user_name",user_name, users));
    if(!isUserExist){
      const user = Effect.runSync(createUserService(user_name))
      users.push(user)
      res.status(200).json({ status: "Success", message: "User Created", data: user })
    }else{
      res.status(400).json({ status: "failure", message: "User Already Exist" })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: "Failure" })
  }

}


export function createTask(req:Request,res:Response){
  try{
    const {user_id}=req.params;
    if(!(isUUID(user_id))){
      res.status(400).json({status: "failure", message: "Invalid User Id"})
      return;
    }

    if((!req.body.title) || (!req.body.description) || (!req.body.status)){
      res.status(400).json({ status: "failure", message: "Invalid Data"})
      return;
      
    }
    const isUserExist = Effect.runSync(doesUserExist("id",user_id, users));
    if(isUserExist){
      const task= Effect.runSync(createTaskService(user_id,req.body));
      tasks.push(task);
      res.status(200).json({ status: "Success", message: "Task Created Successfull", data: task })
    }else{
      res.status(400).json({ status: "failure", message: "User Doesn't Exist" })
    }
  }catch(err){
    console.log(err)
    res.status(400).json({ status: "Failure" })
  }
}


export const getAllTasks=(req:Request,res:Response)=>{
  try{
    const {user_id}=req.params;
    if(!(isUUID(user_id))){
      res.status(400).json({status: "failure", message: "Invalid User Id"})
      return;
    }
    const isUserExist = Effect.runSync(doesUserExist("id",user_id, users));
    if(isUserExist){
      const allUserTasks= Effect.runSync(getAllTasksService(user_id,null,tasks));;
      res.status(200).json({ status: "Success", message: "Task Retrieved Successfull", data:  allUserTasks })
    }else{
      res.status(400).json({ status: "failure", message: "User Doesn't Exist" })
    }

  }catch(err){
    console.log(err)
    res.status(400).json({ status: "Failure" })
  }
}


export const getTask=(req:Request,res:Response)=>{
  try{
    const {user_id,task_id}=req.params;
    if((!(isUUID(user_id))) || (!(isUUID(task_id)))){
      res.status(400).json({status: "failure", message: "Invalid Id"})
      return;
    }
    const isUserExist = Effect.runSync(doesUserExist("id",user_id, users));
    if(isUserExist){
      const taskExit= Effect.runSyncExit(getAllTasksService(user_id,task_id,tasks));
      Exit.match(taskExit,{
        onSuccess:(val)=>{
          res.status(200).json({ status: "Success", message: "Task Retrieved Successfull", data: val})
        },
        onFailure:()=>{
          res.status(400).json({ status: "failure", message: "Task Doesn't Exist" })
        }
      })
    }else{
      res.status(400).json({ status: "failure", message: "User Doesn't Exist" })
    }

  }catch(err){
    console.log(err)
    res.status(400).json({ status: "Failure" })
  }
}


export function updateTask(req:Request,res:Response){
  try{
    const {user_id,task_id}=req.params;
    if((!(isUUID(user_id))) || (!(isUUID(task_id)))){
      res.status(400).json({status: "failure", message: "Invalid Id"})
      return;
    }

    if((!req.body.title) || (!req.body.description) || (!req.body.status)){
      res.status(400).json({ status: "failure", message: "Invalid Data"})
      return;
    }
    const isUserExist = Effect.runSync(doesUserExist("id",user_id, users));
    if(isUserExist){
      const task= Effect.runSync(updateTaskService(task_id,user_id,req.body,tasks));
      res.status(200).json({ status: "Success", message: "Task Updated Successfull", data: task })
    }else{
      res.status(400).json({ status: "failure", message: "Task Doesn't Exist" })
    }
  }catch(err){
    console.log(err)
    res.status(400).json({ status: "Failure" })
  }
}
