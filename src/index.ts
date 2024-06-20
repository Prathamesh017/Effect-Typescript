import express, { Express, Request, Response } from "express";
import userRouter from "./routes/routes.ts";



const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/user",userRouter);
app.listen(port,()=>{
  console.log(`Server Listing on Port:${port}`);
})