import express from 'express'
import { createTask, createUser, getAllTasks } from '../controllers/user.controller.ts';



const userRouter = express.Router()

userRouter.post("/", createUser).post("/:user_id/tasks",createTask).get("/:user_id/tasks",getAllTasks);


export default userRouter;