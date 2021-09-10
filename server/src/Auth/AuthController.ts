import { Request, Response } from "express";
import { IAdmin } from "./AdminTypes";
import { Admin } from "./AdminModel";

export const Register = async (req: Request, res: Response) => {
  try {
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
        
        if(!user || !isMatch){
            return res.json({ message: "Email or password incorrect"});
        }

        res.status(200).json({ message: "Logged in successfully"})
    
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}
