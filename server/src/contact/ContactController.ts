import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.status(200).json("Successfully submitted inquire!");
});

export { router as ContactRouter }
