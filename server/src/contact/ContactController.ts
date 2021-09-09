import { Request, Response } from "express";
import { sendMail } from "./ContactService";
import { IEmail } from "./ContactTypes";

export const SendEmail = (req: Request, res: Response) => {
  const mail: IEmail = req.body.body;
  if (mail !== null) {
    sendMail(mail);
    res.status(200).json("Successfully submitted inquire!");
  } else {
    res.status(400).json("Bad mail object");
  }
};
