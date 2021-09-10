import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import { IAdmin } from "./AdminTypes";

const AdminSchema: Schema = new Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  PhoneNumber: {
    type: String,
    required: true
  },
  HashPassword: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

AdminSchema.pre('save', async function(next) {
    const user = this as IAdmin;
    try {
        if(!user.isModified('password')) next();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.HashPassword, salt);
        user.HashPassword = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

AdminSchema.methods.comparePassword = function(plainPwd) {
    const user = this as IAdmin;
    return bcrypt.compareSync(plainPwd, user.HashPassword);
}

export const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
