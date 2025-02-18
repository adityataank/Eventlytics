import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

import { v1 } from "./routes/sub-router/v1";

import { errorMiddleware, logger } from "./middlewares/logger";
import { authApiRequest } from "./middlewares/auth";

export const db = new PrismaClient();

const app = express();

app.use(express.json());

app.use(authApiRequest); // checking API KEY

app.use(logger); // logging the requests

app.use("/api/v1", v1);

app.use(errorMiddleware); // handling errors

export default app;
