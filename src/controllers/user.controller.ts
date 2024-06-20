
import {User} from "../common/inteface.ts";
import { Request, Response } from "express";
import { doesUserExist } from "../services/user-service.ts";
import { Effect, Exit } from "effect";
const users: User[] = [];
export function createUser(req: Request, res: Response){
  try {
    const { user_name } = req.body;
    const isUserExistExit = Effect.runSyncExit(doesUserExist(user_name, users));
    Exit.match(isUserExistExit, {
      onFailure: () => {
        res.status(400).json({ status: "failure", message: "User Already Exist" })
      },
      onSuccess: () => {
        const user = {
          id: users.length + 1,
          user_name
        }
        users.push(user)
        res.status(200).json({ status: "Success", message: "User Created", data: user })
      }
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: "Failure" })
  }

}