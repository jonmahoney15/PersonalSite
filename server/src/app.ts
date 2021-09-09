import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import pinoHttp from "pino-http";
import * as database from "./database/database";
import { errorMiddleware, notFoundMiddleware } from "./util/error";
import { logger } from "./util/logger";
import { Router } from "./Routes/Router";

const app = express();
/*const whitelist = [
  "http://example1.com",
  "http://example2.com",
  "http://localhost:3000/",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, console.log("Not allowed")); //new Error('Not allowed by CORS'))
    }
  },
};*/
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pinoHttp({ logger }));

app.use("/api", Router);

database.connect();

app.use([errorMiddleware, notFoundMiddleware]);

export { app };
