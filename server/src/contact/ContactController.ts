import { Router, Request, Response } from "express";
import { sendMail } from "./ContactService";
import { IEmail } from "./ContactTypes";
const router = Router();

router.post("/", (req: Request, res: Response) => {
  const mail: IEmail = req.body.body;
  
  sendMail(mail);
  res.status(200).json("Successfully submitted inquire!");
});

export { router as ContactRouter }
