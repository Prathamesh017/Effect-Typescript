import express from 'express'
import { createTask, createUser, getAllTasks,getTask, updateTask} from '../controllers/user.controller.ts';



const userRouter = express.Router()

userRouter.post("/", createUser).post("/:user_id/tasks",createTask).get("/:user_id/tasks",getAllTasks).get("/:user_id/tasks/:task_id",getTask).put("/:user_id/tasks/:task_id",updateTask);


export default userRouter;