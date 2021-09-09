import { Request, Response, NextFunction } from "express";
import { Post } from "./Blog/BlogModels";

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

  //@ts-nocheck
  res.post = post;
  next();
};
