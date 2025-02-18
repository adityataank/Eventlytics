import express from "express";

import { login, signUp } from "../controllers/auth";

export const authRouter = express.Router();

authRouter.post("/sign-up", signUp); // other users should not be able to create an account and login as of now.

authRouter.post("/login", login);
