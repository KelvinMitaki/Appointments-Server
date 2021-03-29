import { Context } from "..";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import { patientAuth } from "../../middlewares/auth";

export const UserQueries = {
  async fetchCurrentUser(prt: any, args: any, { req, res }: Context) {
    console.log(req.cookies);
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
      console.log(user);
      return user;
    } catch (error) {
      console.log({ error });
      return null;
    }
  },
  async fetchUsers(prt: any, args: any, { req }: Context) {
    const patient = patientAuth(req, true);
    return User.find({ _id: { $ne: patient._id }, isDoctor: false }).limit(50);
  }
};
