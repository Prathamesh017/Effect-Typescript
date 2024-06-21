import express, { Express, Request, Response } from "express";
import userRouter from "./routes/routes.ts";
import { Effect } from "effect";
import { loggerFunc } from "./common/utitlies.ts";
import {log} from "./common/inteface.ts"



const app: Express = express();
const port = process.env.POR || 3000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/user",userRouter);
app.listen(port,()=>{
  loggerFunc(`Server Listing on Port:${port}`,log.INFO)
})