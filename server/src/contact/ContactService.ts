//@ts-nocheck
import mailer from 'nodemailer';
import { IEmail } from './ContactTypes';


const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.PASSWORD
  }
});

export const sendMail = (req: IEmail) => {
  console.log(req);
  const mailOptions = {
    from: 'donotreplyjonsdevbox@gmail.com',
    to: 'donotreplyjonsdevbox@gmail.com',
    subject: req.Title,
    text: "Requestor: " + req.FirstName +" "+ req.LastName +"\n"+ "Email: "+ req.Email +"\n"+ req.Description       
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if ( error ) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
        info.end("sent");
    }
  })
}
