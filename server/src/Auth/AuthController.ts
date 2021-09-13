import { Request, Response } from "express";
import { Admin, IAdmin } from "./AdminModel";
import jwt from 'jsonwebtoken';
import { user } from '../enums/user';
import dotenv from 'dotenv';

dotenv.config();

export const Register = async (req: Request, res: Response) => {
  try {
    let requestedAdmin: IAdmin = req.body;
    let email = requestedAdmin.Email;
    const exists = await Admin.findOne({Email: email});
    if (exists) {
      res.status(400).json({Status: "Failure", message: "Admin already exists"});
    }

    const newAdmin = new Admin({
      FirstName: requestedAdmin.FirstName,
      LastName: requestedAdmin.LastName,
      Email: requestedAdmin.Email,
      HashPassword: requestedAdmin.HashPassword
    });

    await newAdmin.save();

    res.status(200).json({Status: "Success", message: "New admin added!"});
  } catch (error) {
    res.status(500).json({Status: "Error", message: error.message});
  } 
}

export const Login = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const loginAttempt: IAdmin = req.body;
        let email = loginAttempt.Email;
        const userLogin = await Admin.findOne({ email });
        console.log(userLogin);
        let password = loginAttempt.HashPassword;
        const isMatch = userLogin?.comparePassword(password);
        
        if (!userLogin || !isMatch) {
            return res.status(401).json({Status:"Denied", message: "Email or password incorrect"});
        }

        //@ts-ignore
        const token = jwt.sign({ user: user.ADMIN  }, process.env.JWT_SECRET);

        res.status(200).json({
          token,
          content: { 
            message: "Logged in successfully",
            user: email,
            userStatus: process.env.ADMIN_STATUS
          }
        }); 
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

export const generateToken = async (req: Request, res: Response) => {
  //@ts-ignore
  const token = jwt.sign({ user: user.GUEST }, process.env.JWT_SECRET);
  
  res.status(200).json({
    token,
    message: "New Token"
  })
}
