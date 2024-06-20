import express, { Express, Request, Response } from "express";



const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());



app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port,()=>{
  console.log(`Server Listing on Port:${port}`);
})