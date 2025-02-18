import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { parseToken } from "../utils/helpers";
import { appConfig } from "../config/config";
import { invalidRequest } from "../utils/write-json";

export const authApiRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req?.headers?.["api-key"];
  if (apiKey !== appConfig.API_KEY) {
    return invalidRequest(res, "Invalid API KEY", 401);
  }
  next();
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = parseToken(req.headers.authorization ?? "");
  if (!token) {
    return invalidRequest(res, "Unauthorized User", 401);
  }
  const userId = jwt.verify(token, appConfig.JWT_SECRET_KEY);

  if (!userId) {
    return invalidRequest(res, "Token verification failed", 400);
  }

  console.log(`Logged in user: ${userId}\n`);
  req["headers"]["userId"] = userId as string;
  next();
};
