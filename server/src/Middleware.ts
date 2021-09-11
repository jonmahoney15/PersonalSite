import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
dotenv.config();

import  jwt from "jsonwebtoken";
import { Post } from "./Blog/BlogModels";
import { user } from "./enums/user";

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let post;
  try {
    post = await Post.findById(req.body.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find User" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  //@ts-ignore
  res.post = post;
  next();
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try{
    const token = req.header("x-auth-token");
    
    if(!token)
    {
      return res.status(401).json({msg: "No authentication token, access denied"});
    }
    
    //@ts-ignore
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    if(!verified)
    {
      return res.status(401).json({msg: "Token verification failed, authorization denied"});
    }
    
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    
    if (user === user.ADMIN) return res.status(401).json({Status: "Denied", message: "User doesn't have Admin access"});
      
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
