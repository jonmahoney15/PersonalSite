import { Request, Response } from "express";
import { Admin, IAdmin } from "./AdminModel";
import jwt from 'jsonwebtoken';
import { user } from '../enums/user';
import dotenv from 'dotenv';

dotenv.config();

export const Register = async (req: Request, res: Response) => {
  try {
    console.log("in register");
    let requestedAdmin: IAdmin = req.body;
    let email = requestedAdmin.Email;
    const exists = await Admin.findOne({Email: email});
    if (exists) {
      res.status(400).json({message: "Admin already exists"});
    }

    const newAdmin = new Admin({
      FirstName: requestedAdmin.FirstName,
      LastName: requestedAdmin.LastName,
      Email: requestedAdmin.Email,
      PhoneNumber: requestedAdmin.PhoneNumber,
      HashPassword: requestedAdmin.HashPassword
    });

    await newAdmin.save();

    res.status(200).json({message: "New admin added!"});
  } catch (error) {
    res.status(500).json({message: error.message})
  } 
}

export const Login = async (req: Request, res: Response) => {
    try {
        const loginAttempt: IAdmin = req.body;
        let email = loginAttempt.Email;
        const user = await Admin.findOne({ email });
        let password = loginAttempt.HashPassword;
        const isMatch = user?.comparePassword(password);
        
        if (!user || !isMatch) {
            return res.json({"Status":"Failure","Details": "Email or password incorrect"});
        }

        //@ts-ignore
        const token = jwt.sign({ user: user.ADMIN }, process.env.JWT_SECRET);
  
        res.status(200).json({
          token,
          content: { 
            message: "Logged in successfully",
            email: email                    
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
    user: {
      status:"Guest user"
    }
  })
}
