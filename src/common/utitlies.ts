import { Effect } from "effect";
import { log } from "./inteface.ts";

export function isUUID(value:string):boolean{
  const uuidPattern =getUUIDPattern();
  return uuidPattern.test(value);
}
export function getUUIDPattern(){
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidPattern;
}


export function loggerFunc(message:string,type:log){
  const program=type===log.ERR?Effect.logError(message):Effect.logInfo(message);
  Effect.runSync(program)
}