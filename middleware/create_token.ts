import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
// const session = require('session')
const secretkey ='sdfukzsy'

export function createToken(req:Request){

    const key = secretkey;
    const token = jwt.sign(
        
        { userId: req.body.email },key,{ expiresIn: "5d" }
    );
    return token
}