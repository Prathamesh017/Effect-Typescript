export function isUUID(value:string):boolean{
  const uuidPattern =getUUIDPattern();
  return uuidPattern.test(value);
}
export function getUUIDPattern(){
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidPattern;
}