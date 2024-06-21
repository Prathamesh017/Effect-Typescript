import express from 'express'
import { createTask, createUser } from '../controllers/user.controller.ts';



const userRouter = express.Router()

userRouter.post("/", createUser).post("/:user_id/tasks",createTask);


export default userRouter;