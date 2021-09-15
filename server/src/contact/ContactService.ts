import mailer from "nodemailer";
import { IEmail } from "./ContactTypes";
import { logger } from "../util/logger";
import { config } from '../config';
const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: config.from_email,
    pass: config.password,
  },
});

export const sendMail = (req: IEmail) => {
  const mailOptions = {
    from: config.from_email,
    to: config.to_email,
    subject: req.Title,
    text:
      "Requestor: " +
      req.FirstName +
      " " +
      req.LastName +
      "\n" +
      "Email: " +
      req.Email +
      "\n" +
      req.Description,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.info(`Error in Contact Service: ${error}`);
    } else {
      logger.info(`Email sent: ${info.response}`);
    }
  });
};
