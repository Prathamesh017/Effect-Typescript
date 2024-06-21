import { Effect } from "effect";
import { doesUserExist } from "./user-service.ts";
import {User} from "../common/inteface.ts"
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

  it("should return Success if user not exists before", async () => {
    const user = "user 3";
    const exit = doesUserExist(user,mockUsers)
    const result = Effect.runSyncExit(exit);
    (await chai).expect(result._tag).to.equal('Success');
  })
  it("should fail with a error if user already exists", async () => {
    const user = "user 1";
    const exit = doesUserExist(user, mockUsers)
    const result = Effect.runSyncExit(exit);
    (await chai).expect(result._tag).to.equal("Failure");
  })

  


})