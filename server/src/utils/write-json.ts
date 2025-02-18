import { Response } from "express";

export const invalidRequest = (
  res: Response,
  error: string,
  statusCode = 400
) => {
  res.status(statusCode).json({ error });
};

export const successResponse = (res: Response, json: any, statusCode = 200) => {
  res.status(statusCode).json(json);
};
