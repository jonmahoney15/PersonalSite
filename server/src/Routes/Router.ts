import { Router } from "express";
import { SendEmail } from "../contact/ContactController";
import { Register, Login, generateToken } from "../Auth/AuthController";
import { GetPosts, CreatePost, RemovePost, UpdatePost } from "../Blog/BlogController";
import { getPost, auth, verifyAdmin, rateLimiter, largeLimiter, upload } from "../Middleware";

const router = Router();

router.get("/health", auth, verifyAdmin, (req, res) => res.send({ message: "OK" }));
router.post("/contact", auth, rateLimiter, SendEmail);
router.get("/blog/Posts", auth, largeLimiter, GetPosts);
router.post("/blog/CreatePost", auth, verifyAdmin, upload.single("file"), CreatePost);
router.post("/blog/RemovePost", auth, verifyAdmin, getPost, RemovePost);
router.post("/blog/EditPost", auth, verifyAdmin, getPost, UpdatePost);
router.post("/Auth/Login", auth, rateLimiter, Login);
router.post("/Auth/Register", auth, verifyAdmin, Register);
router.get("/Auth/token", largeLimiter, generateToken);

export { router as Router };
