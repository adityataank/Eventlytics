import { UserType } from "../types/user";
import { EMAIL_REGEX } from "./constant";

export const validateSignUpPayload = (payload: any) => {
  const { name, email, password } = payload ?? {};
  if (!name) return "Name is required.";
  if (!email || !EMAIL_REGEX.test(email)) return "Email is invalid.";
  if (!password) return "Password is required";
  return "";
};

export const validateLoginPayload = (payload: any) => {
  const { email, password } = payload ?? {};
  if (!email || !EMAIL_REGEX.test(email)) return "Email is invalid";
  if (!password) return "Password is required";
  return "";
};

export const validateNewProjectPayload = (payload: any) => {
  const { name } = payload ?? {};
  if (!name) return "Name is required";
  return "";
};

export const validateEventPayload = (payload: any) => {
  const { name } = payload ?? {};

  if (!name) return "Event name is required";
  return "";
};
