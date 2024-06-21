import { Effect } from "effect";
import { createTaskService, createUserService, doesUserExist } from "./user-service.ts";
import {TaskStatus, User} from "../common/inteface.ts"
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
    const exit = doesUserExist("user_name",user,mockUsers)
    const result = Effect.runSync(exit);
    (await chai).expect(result).to.equal(false);
  })
  it("should return true if user already exists", async () => {
    const user = "user 1";
    const exit = doesUserExist("user_name",user, mockUsers)
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

  it('should generate a task', async () => {
    const user_id="1";
    const mockTask=
    { 
      "title":"Task 2",
      "description":"DESKTOP APP",
      "status":TaskStatus.INPROGRESS,
      "dueDate":new Date(),
    }
    const effect = createTaskService(user_id,mockTask);
    const result = Effect.runSync(effect);
    (await chai).expect(result.title).to.equals(mockTask.title);
    (await chai).expect(result.status).to.equals(mockTask.status);
    (await chai).expect(result.description).to.equals(mockTask.description);
    (await chai).expect(result.dueDate).to.equals(mockTask.dueDate);
  });


  


})