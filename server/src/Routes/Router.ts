import { Router } from "express";
import { SendEmail } from "../contact/ContactController";
import {
  GetPosts,
  CreatePost,
  RemovePost,
  UpdatePost,
} from "../Blog/BlogController";
import { Register, Login, generateToken } from "../Auth/AuthController";
import { getPost, auth, verifyAdmin, rateLimiter, upload } from "../Middleware";

const router = Router();

router.get("/health", auth, verifyAdmin, (req, res) => res.send({ message: "OK" }));
router.post("/contact", auth, rateLimiter, SendEmail);
router.get("/blog/Posts", auth, GetPosts);
router.post("/blog/CreatePost", auth, verifyAdmin, upload.single("file"), CreatePost);
router.post("/blog/RemovePost", auth, verifyAdmin, getPost, RemovePost);
router.post("/blog/EditPost", auth, verifyAdmin, getPost, UpdatePost);
router.post("/Auth/Login", auth, rateLimiter, Login);
router.post("/Auth/Register", auth, verifyAdmin, Register);
router.get("/Auth/token", rateLimiter, generateToken);

export { router as Router };
