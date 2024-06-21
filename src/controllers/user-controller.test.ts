import { describe, it} from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { createTask, createUser } from './user.controller.ts';
import { Request, Response } from 'express';import { Effect } from 'effect';
import { isUUID } from '../common/utitlies.ts';
import { TaskStatus } from '../common/inteface.ts';
import { v4 as uuidv4 } from 'uuid';


const mockResponse = () => {
  let res:any={} ;
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};
const mockRequest=(body:any,params:any=null)=>({
  body,
  params,
})


describe('User-Controller Test Cases', () => {
  it('create a new user successfully',() => {
   
    let user= "user 1"
    const req = mockRequest({user_name:user}) as Request;
    const  res=mockResponse();
    createUser(req, res as Response);
    expect(res.status.calledOnceWithExactly(200)).to.be.true;
    expect(res.json.calledOnceWithExactly({status: "Success", message: "User Created", data: {user_name:user,id:sinon.match(isUUID)}})).to.be.true;
  });


  it('throw error if user already exist',() => {
    let user="user 1"
    const req = mockRequest({user_name:user}) as Request;
    const  res=mockResponse();
    createUser(req, res);
    expect(res.status.calledOnceWithExactly(400)).to.be.true;
    expect(res.json.calledOnceWithExactly({status: "failure", message: "User Already Exist"})).to.be.true;
  });
});


describe("Task Controller Test Cases",()=>{
  const mockTask=
  { 
    "title":"Task 2",
    "description":"DESKTOP APP",
    "status":TaskStatus.INPROGRESS,
    "dueDate":new Date(),
  }
  it('should return 400 if user_id is invalid', () => {
    const user_id='invalid-uuid';
    const req = mockRequest({mockTask},{user_id}) as Request;
    const  res=mockResponse();
    createTask(req as Request, res as Response);

    expect(res.status.calledOnceWithExactly(400)).to.be.true;
    expect(res.json.calledOnceWithExactly({ status: "failure", message: "Invalid User Id"})).to.be.true;
   
  });
  it('should return 400 if required body data is missing', () => {
    const user_id=uuidv4();
    const req = mockRequest({title:"",description:"",status:""},{user_id}) as Request;
    const  res=mockResponse();
    createTask(req as Request, res as Response);
    expect(res.status.calledOnceWithExactly(400)).to.be.true;
    expect(res.json.calledOnceWithExactly({status: "failure", message: "Invalid Data"})).to.be.true;
  });

  it('check for user does not exist', () => {
    const user_id=uuidv4();
    const  req = mockRequest(mockTask,{user_id}) as Request;
    const  res=mockResponse();
    createTask(req as Request, res as Response);
    expect(res.status.calledOnceWithExactly(400)).to.be.true;
    expect(res.json.calledOnceWithExactly({status: "failure", message: "User Doesn't Exist"})).to.be.true;
  });
})