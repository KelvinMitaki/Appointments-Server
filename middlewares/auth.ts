import { AuthenticationError, ForbiddenError } from "apollo-server-errors";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { UserDoc } from "../models/User";
export const patientAuth = (req: Request, allowDoctor?: boolean) => {
  if (!req.cookies || Object.keys(req.cookies).length === 0) {
    throw new AuthenticationError("Not authenticated");
  }
  let split_token = req.cookies["client_token"];

  if (!split_token) {
    split_token = req.cookies["token"];
  }
  if (!split_token) {
    throw new AuthenticationError("Not authenticated");
  }

  try {
    const user = jwt.verify(split_token, process.env.JWT_SECRET!) as UserDoc;
    if (user.isDoctor && !allowDoctor) {
      throw new ForbiddenError("Not authorized");
    }
    return user;
  } catch (error) {
    console.log({ error });
    throw new AuthenticationError("Not authenticated");
  }
};
export const doctorAuth = (req: Request) => {
  if (!req.cookies || Object.keys(req.cookies).length === 0) {
    throw new AuthenticationError("Not authenticated");
  }
  let split_token = req.cookies["client_token"];

  if (!split_token) {
    split_token = req.cookies["token"];
  }
  if (!split_token) {
    throw new AuthenticationError("Not authenticated");
  }

  try {
    const user = jwt.verify(split_token, process.env.JWT_SECRET!) as UserDoc;
    if (!user.isDoctor) {
      throw new ForbiddenError("Not authorized");
    }
    return user;
  } catch (error) {
    console.log({ error });
    throw new AuthenticationError("Not authenticated");
  }
};
