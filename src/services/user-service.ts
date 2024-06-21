import { Effect } from "effect";
import { User } from "../common/inteface.ts";
import { v4 as uuidv4 } from 'uuid';


export const doesUserExist = (user_name: string, users: User[]): Effect.Effect<boolean, Error> => {
  const isUser = users.some(user => user.user_name === user_name);
  return Effect.sync(() => {
    if (isUser) {
      throw new Error();
    }
    return false;
  })
};

export const createUserService = (user_name: string): Effect.Effect<User,never> => {
  const user:User={
    id:uuidv4(),
    user_name
  }
  return Effect.succeed(user);
};