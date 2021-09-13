import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
dotenv.config();

import  jwt from "jsonwebtoken";
import { Post } from "./Blog/BlogModels";
import * as User from "./enums/user";

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let post;
  try {
    post = await Post.findById(req.body.id);
    if (post == null) {
      return res.status(404).json({ Status: "Failure", message: "Cannot find User" });
    }
  } catch (err) {
    return res.status(500).json({ Status: "Error", message: err.message });
  }

  next();
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try{
    const token = req.header("x-auth-token");
    
    if(!token)
    {
      return res.status(401).json({ Status: "Denied", message: "No authentication token, access denied" });
    }
    
    //@ts-ignore
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    if(!verified)
    {
      return res.status(401).json({ Status: "Denied", message: "Token verification failed, authorization denied" });
    }
    
    next();
  } catch (err) {
    res.status(500).json({ Status: "Error", message: "Error: "+ err.message });
  }
}

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");
    
    //@ts-ignore
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!verified) return res.status(401).json({Status: "Denied", message: "Invalid token content"});
    
    //@ts-ignore
    const user = verified.user;
    console.log(user);
    console.log(User.user.GUEST);
    if (user === User.user.GUEST) return res.status(401).json({Status: "Denied", message: "User doesn't have Admin access"});
      
    next();
  } catch (err) {
    res.status(500).json({Status: "Error", message: err.message });
  }
}
