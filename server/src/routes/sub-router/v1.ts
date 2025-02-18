import express from "express";

import { healthCheck } from "../../controllers/health-check";

import { authRouter } from "../auth";
import { projectRouter } from "../project";
import { authenticateToken } from "../../middlewares/auth";
import { eventRouter } from "../event";

export const v1 = express.Router();

v1.get("/health-check", healthCheck);

v1.use("/auth", authRouter);

// protected routes starts from here -------------------------------------------------------

v1.use(authenticateToken);

v1.use("/project", projectRouter);

v1.use("/event", eventRouter);
