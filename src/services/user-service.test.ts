import { Effect, Exit } from "effect";
import { createTaskService, createUserService, doesUserExist, getAllTasksService, updateTaskService } from "./user-service.ts";
import { Task, TaskStatus, User } from "../common/inteface.ts"
import { createUser } from "../controllers/user.controller.ts";
import { getUUIDPattern, isUUID } from "../common/utitlies.ts";
const chai = import('chai');
describe("user service", () => {
  const mockUsers: User[] = [
    {
      id: "1",
      user_name: "user 1"
    },
    {
      id: "2",
      user_name: "user 2"
    }
  ]
  it("should return false if user not exists before", async () => {
    const user = "user 3";
    const exit = doesUserExist("user_name", user, mockUsers)
    const result = Effect.runSync(exit);
    (await chai).expect(result).to.equal(false);
  })
  it("should return true if user already exists", async () => {
    const user = "user 1";
    const exit = doesUserExist("user_name", user, mockUsers)
    const result = Effect.runSync(exit);
    (await chai).expect(result).to.equal(true);
  })
  it('should generate a user', async () => {
    const user_name = 'test_user';
    const effect = createUserService(user_name);
    const result = Effect.runSync(effect);
    const uuidPattern = getUUIDPattern();
    (await chai).expect(result.user_name).to.equals(user_name);
    (await chai).expect(result.id).to.match(uuidPattern)
  });

})

describe(("Task Service"), () => {
  const tasks: Task[] = [
    { id: 'task1', title: 'Task 1', description: 'Description 1', status: TaskStatus.TODO, user_id: 'user1', dueDate: new Date(Date.now()) },
    { id: 'task2', title: 'Task 2', description: 'Description 2', status: TaskStatus.INPROGRESS, user_id: 'user2', dueDate: new Date(Date.now()) },
    { id: 'task3', title: 'Task 3', description: 'Description 3', status: TaskStatus.DONE, user_id: 'user1', dueDate: new Date(Date.now()) },
  ];

  //! Create Tests
  it('should generate a task', async () => {
    const user_id = "1";
    const mockTask =
    {
      "title": "Task 2",
      "description": "DESKTOP APP",
      "status": TaskStatus.INPROGRESS,
      "dueDate": new Date(),
    }
    const effect = createTaskService(user_id, mockTask);
    const result = Effect.runSync(effect);
    (await chai).expect(result.title).to.equals(mockTask.title);
    (await chai).expect(result.status).to.equals(mockTask.status);
    (await chai).expect(result.description).to.equals(mockTask.description);
    (await chai).expect(result.dueDate).to.equals(mockTask.dueDate);
  });


  //! GET ALL TASKS
  it('return all tasks for a given userId', async () => {
    const userId = 'user1';
    const result = Effect.runSync(getAllTasksService(userId, null, tasks));
    (await chai).expect(result.length).to.equals(2);
    (await chai).expect(result[0]).to.equals(tasks[0]);
    (await chai).expect(result[1]).to.equals(tasks[2]);
  });

  it('should return an empty array if the userId has no tasks', async () => {
    const userId = 'user3';
    const result = Effect.runSync(getAllTasksService(userId, null, tasks));
    (await chai).expect(result.length).to.equals(0);
  });

   //! GET A TASK
  it('return a particular task for a given userId and taskId', async () => {
    const userId = 'user1';
    const taskId = "task3";
    const result = Effect.runSync(getAllTasksService(userId, taskId, tasks));
    (await chai).expect(result.length).to.equals(1);
    (await chai).expect(result[0]).to.equals(tasks[2]);
  });


  it('should throw an error if the specific task does not exist for the given userId', async () => {
    const userId = 'user1';
    const taskId = 'task0';
    try {
     Effect.runSyncExit(getAllTasksService(userId, taskId, tasks));
    }
    catch (err) {
      (await chai).expect(err).to.be.an('error').with.property('message', "Tasks Doesn't Exist");
    }
  });


  // !  Update Task
  it('should update the task successfully',async()=>{
    const task_id = 'task1';
    const user_id = 'user1';
    const mockTask =
    {
      "title": "Task1",
       id:task_id,
       user_id:user_id,
      "description": "Description",
      "status": TaskStatus.DONE,
      "dueDate": new Date(),
    }
    const result=Effect.runSync(updateTaskService(task_id,user_id,mockTask,tasks));
    (await chai).expect(result.status).to.be.equal(mockTask.status);
    (await chai).expect(tasks[0]).to.be.deep.equal(mockTask);

  })
  it('should fail if given task not found',async()=>{
    const task_id = 'task4';
    const user_id = 'user1';
    const mockTask =
    {
      "title": "Task1",
       id:task_id,
       user_id:user_id,
      "description": "Description",
      "status": TaskStatus.DONE,
      "dueDate": new Date(),
    }
    try {
      Effect.runSyncExit(updateTaskService(task_id,user_id,mockTask,tasks));
     }
     catch (err) {
       (await chai).expect(err).to.be.an('error').with.property('message', "Task Doesn't Exist");
     }
  })
})