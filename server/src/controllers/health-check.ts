import { Request, Response } from "express";
import { asyncHandler } from "../utils/helpers";

export const healthCheck = asyncHandler((req: Request, res: Response) => {
  res.status(200).json({ status: "Server is up and running." });
});
