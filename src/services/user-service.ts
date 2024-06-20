import { Effect } from "effect";
import { User } from "../common/inteface.ts";

export const doesUserExist = (user_name: string, users: User[]): Effect.Effect<boolean, Error> => {
  const isUser = users.some(user => user.user_name === user_name);
  return Effect.sync(() => {
    if (isUser) {
      throw new Error();
    }
    return false;
  })
};

