import  Mongoose  from "mongoose";
import dotenv from "dotenv";

let database: Mongoose.Connection;

dotenv.config();

export const connect = () => {
  if(database){
    return;
  }

  Mongoose.connect(`${process.env.MONGO_DB_URI}`); 
  
  
  database = Mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database");
  });

  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
