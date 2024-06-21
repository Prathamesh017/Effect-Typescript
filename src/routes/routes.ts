import express from 'express'
import { createTask, createUser, getAllTasks,getTask, updateTask,deleteTask} from '../controllers/user.controller.ts';



const userRouter = express.Router()

userRouter.post("/", createUser).post("/:user_id/tasks",createTask).get("/:user_id/tasks",getAllTasks).get("/:user_id/tasks/:task_id",getTask).put("/:user_id/tasks/:task_id",updateTask).delete("/:user_id/tasks/:task_id",deleteTask);


export default userRouter;