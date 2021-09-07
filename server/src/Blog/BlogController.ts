import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';
import { IPost } from "./BlogTypes";
import { Post } from "./BlogModels";

export const GetPosts = (req: Request, res: Response) =>
{
  Post.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).json({message: err.message});
    } else { 
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.json({items: items});
    }
  })
}

export const RemovePost = async (req: Request, res: Response) => {
  try {
    const title = req.body.Title;
    const post = await Post.findOne({ title });
    
    if ( !post )
    {
        res.json({message: "No post with that title"})
    } 

  } catch(error) {
    res.status(500).json({ message: error.message });
  }
}

export const CreatePost = async (req: Request, res: Response) => {
  try {
    const post: IPost = JSON.parse(req.body.Post);
    const title = post.Title;
    const exists = await Post.findOne({ title }); 

    if (exists) {
      return res.json({message: "Title already exists!"});
    }

    const newPost = new Post({
      Title: post.Title,
      Date: post.Date,
      Description: post.Description,
      Image: { 
        data: fs.readFileSync(path.join(__dirname + '/../../uploads/' + req.file.filename)), 
        contentType: 'image/png' 
      },
      MarkDown: post.MarkDown
    });

    await newPost.save();
    
    res.status(200).json({ message: `New Post with Title: ${newPost.Title} added` })

  } catch(error) {
    res.status(500).json({ message: error.message });
  }
}
