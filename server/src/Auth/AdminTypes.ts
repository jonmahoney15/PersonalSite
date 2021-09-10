import { Document } from 'mongoose';

export interface IAdmin extends Document {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  HashPassword: string;
  Date: Date;
} 
