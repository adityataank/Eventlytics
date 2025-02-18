import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { createUser, findUser } from "../services/user";

import {
  validateLoginPayload,
  validateSignUpPayload,
} from "../utils/validator";
import { invalidRequest, successResponse } from "../utils/write-json";
import { MONGO_ERROR_CODES } from "../utils/constant";
import { asyncHandler } from "../utils/helpers";

import { appConfig } from "../config/config";

export const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const error = validateSignUpPayload(payload);
      if (error) return invalidRequest(res, error);

      await createUser(payload);

      successResponse(res, { message: "Signed up successfully." }, 201);
    } catch (error: any) {
      if (error?.code === MONGO_ERROR_CODES.DUPLICATE_ENTRY) {
        invalidRequest(
          res,
          `User with email ${req.body.email} already exists.`
        );
      } else {
        next(error);
      }
    }
  }
);

export const login = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;
  const error = validateLoginPayload(payload);
  if (error) return invalidRequest(res, error);

  const user = await findUser(payload);

  if (user.error) return invalidRequest(res, user.error, user.statusCode);

  const secretKey = appConfig.JWT_SECRET_KEY;

  if (!secretKey) return invalidRequest(res, "Unable to generate token.", 500);

  if (!user.data?.id) {
    return invalidRequest(res, "Unable to login");
  }

  const token = jwt.sign(user.data.id, appConfig.JWT_SECRET_KEY);

  return successResponse(res, {
    message: "User logged in successfully.",
    token,
  });
});
