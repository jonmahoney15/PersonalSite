import { Router } from "express";
import rateLimit from "express-rate-limit";
import multer from "multer";
import { SendEmail } from "../contact/ContactController";
import {
  GetPosts,
  CreatePost,
  RemovePost,
  UpdatePost,
} from "../Blog/BlogController";
import { Register, Login, generateToken } from "../Auth/AuthController";
import { getPost, auth, verifyAdmin } from "../Middleware";

const contactLimiter = rateLimit({
  max: 5,
  windowMs: 24 * 60 * 60 * 1000, //one day
  message: "Too many attempts!",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/health", auth, verifyAdmin, (req, res) => res.send({ message: "OK" }));
router.post("/contact", auth, contactLimiter, SendEmail);
router.get("/blog/Posts", auth, GetPosts);
router.post("/blog/CreatePost", auth, verifyAdmin, upload.single("file"), CreatePost);
router.post("/blog/RemovePost", auth, verifyAdmin, getPost, RemovePost);
router.post("/blog/EditPost", auth, verifyAdmin, getPost, UpdatePost);
router.post("/Auth/Login", auth, contactLimiter, Login);
router.post("/Auth/Register", auth, verifyAdmin, Register);
router.get("/Auth/token", generateToken);

export { router as Router };
