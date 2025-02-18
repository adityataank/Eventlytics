import { NextFunction, Request, Response } from "express";
import { logRequest } from "../utils/log-request";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  logRequest(req);
  next();
};

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("ERROR", error.stack, "\n");
  res.status(500).json({ error: "Internal Server Error" });
};
