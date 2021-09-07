import { Router } from "express";
import rateLimit from "express-rate-limit";
import multer from 'multer';
import { SendEmail } from "../contact/ContactController";
import { GetPosts, CreatePost } from "../Blog/BlogController";

const contactLimiter = rateLimit({
  max: 5,
  windowMs: 24 * 60 * 60 * 1000,//one day
  message: "Too many email requests!"
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/health", (req, res) => res.send({ message: "OK" }));
router.post("/contact", contactLimiter, SendEmail);
router.get("/blog/Posts", GetPosts);
router.post("/blog/CreatePost", upload.single('file'), CreatePost);

export { router as Router }
