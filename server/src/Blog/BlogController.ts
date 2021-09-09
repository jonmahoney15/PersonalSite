import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { IPost } from "./BlogTypes";
import { Post } from "./BlogModels";

export const GetPosts = (req: Request, res: Response) => {
  Post.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    } else {
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json({ items: items });
    }
  });
};

export const UpdatePost = async (req: Request, res: Response) => {
  try {
    const post = req.body.post;
    const original = await Post.findById(req.body.id);

    if (
      original?.Title === post.Title &&
      original?.MarkDown === post.MarkDown &&
      original?.Description === post.Description
    ) {
      res
        .status(200)
        .json({ message: "The updated post has no difference from original." });
    }

    await Post.findByIdAndUpdate(req.body.id, {
      Title: post.Title,
      Date: post.Date,
      Description: post.Description,
      Image: original?.Image,
      MarkDown: post.MarkDown,
    });

    res.status(200).json({ message: "Succesfully updated post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const RemovePost = async (req: Request, res: Response) => {
  try {
    const postRemoved = await Post.findByIdAndRemove(req.body.id);
    res.json({ message: `Removed ${postRemoved?.Title}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const CreatePost = async (req: Request, res: Response) => {
  try {
    const post: IPost = JSON.parse(req.body.Post);
    const title: string = post.Title;
    const exists = await Post.findOne({ Title: title });

    if (exists) {
      return res.json({ message: "Title already exists!" });
    }

    const newPost = new Post({
      Title: post.Title,
      Date: post.Date,
      Description: post.Description,
      Image: {
        data: fs.readFileSync(
          path.join(__dirname + "/../../uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      },
      MarkDown: post.MarkDown,
    });

    await newPost.save();

    res
      .status(200)
      .json({ message: `New Post with Title: ${newPost.Title} added` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
