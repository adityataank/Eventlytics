import bcrypt from "bcrypt";

import { db } from "../app";

import { UserType } from "../types/user";

type User = {
  id: string;
  email: string;
  password: string;
};

type Result<T> =
  | { data: T; error?: never; statusCode?: never }
  | { data?: never; error: string; statusCode: number };

export const createUser = async (payload: UserType) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const newUser = await db.user.create({
    data: { ...payload, password: hashedPassword },
  });
  newUser.password = "";
  return newUser;
};

export const findUser = async (payload: UserType): Promise<Result<User>> => {
  const { email, password } = payload ?? {};

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "User not found", statusCode: 404 };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { error: "Invalid password", statusCode: 401 };
  }

  user.password = "";

  return { data: user };
};
