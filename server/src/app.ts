import "express-async-errors";
import cors from "cors";
import helmet from 'helmet';
import express from "express";
import pinoHttp from "pino-http";
import { ContactRouter } from "./Contact/ContactController";

import { errorMiddleware, notFoundMiddleware } from "./util/error";
import { logger } from "./util/logger";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pinoHttp({ logger }));

app.get("/api/health", (req, res) => res.send({ message: "OK" }));

app.use("/api/contact", ContactRouter);

app.use([errorMiddleware, notFoundMiddleware]);

export { app };
