import { NextFunction, Request, Response } from "express";

export const asyncHandler =
  (fn = (req: Request, res: Response, next: NextFunction) => {}) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const parseToken = (authHeader: string): string => {
  const token = authHeader?.split(" ")?.at(1);
  return token ?? "";
};
