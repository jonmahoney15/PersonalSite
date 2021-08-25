//@ts-nocheck
import mailer from 'nodemailer';
import { IEmail } from './ContactTypes';
import { logger } from '../util/logger';

const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.PASSWORD
  }
});

export const sendMail = (req: IEmail) => {
  const mailOptions = {
    from: 'donotreplyjonsdevbox@gmail.com',
    to: 'donotreplyjonsdevbox@gmail.com',
    subject: req.Title,
    text: "Requestor: " + req.FirstName +" "+ req.LastName +"\n"+ "Email: "+ req.Email +"\n"+ req.Description       
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if ( error ) {
        logger.info(`Error in Contact Service: ${error}`);
    } else {
        logger.info(`Email sent: ${info.response}`);
        info.end("sent");
    }
  })
}
