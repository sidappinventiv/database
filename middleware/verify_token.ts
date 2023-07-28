import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
      const decoded = jwt.verify(token,'sid'); 

      res.json( (<any>req).User )
      next(); 
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  };