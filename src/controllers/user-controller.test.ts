import { describe, it} from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { createUser } from './user.controller.ts';
import { Request, Response } from 'express';


const mockResponse = () => {
  let res:any={} ;
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};
const mockRequest=(body:any)=>({
  body,
})

describe('User-Controller Test Cases', () => {
  it('create a new user successfully',() => {
   
    let user= "user 1"
    const req = mockRequest({user_name:user}) as Request;
    const  res=mockResponse();
    createUser(req, res as Response);

    expect(res.status.calledOnceWithExactly(200)).to.be.true;
    expect(res.json.calledOnceWithExactly({status: "Success", message: "User Created", data: {user_name:user,id:1}})).to.be.true;
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
