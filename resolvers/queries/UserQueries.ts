import { Context } from "..";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export const UserQueries = {
  async fetchCurrentUser(prt: any, args: any, { req, res }: Context) {
    if (!req.cookies || Object.keys(req.cookies).length === 0) {
      return null;
    }
    let split_token = req.cookies["client_token"];

    if (!split_token) {
      split_token = req.cookies["token"];
    }
    if (!split_token) {
      return null;
    }

    try {
      const user = jwt.verify(split_token, process.env.JWT_SECRET!);
      return user;
    } catch (error) {
      console.log({ error });
      return null;
    }
  },
  fetchUsers() {
    return User.find({ isDoctor: false });
  }
};
