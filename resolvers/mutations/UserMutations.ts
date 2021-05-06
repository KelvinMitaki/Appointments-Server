import { ForbiddenError } from "apollo-server-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Context } from "..";
import { registerValidation, loginValidation } from "../../middlewares/validation";
import User, { UserAttrs } from "../../models/User";

export const UserMutations = {
  async registerUser(prt: any, args: { values: UserAttrs }, { res }: Context) {
    registerValidation(args.values);
    const userExists = await User.exists({
      $or: [
        { fullName: args.values.fullName.toLowerCase() },
        {
          civilID: args.values.civilID
        }
      ]
    });
    if (userExists) {
      throw new ForbiddenError("User with that name or civil ID already exists");
    }
    args.values.fullName = args.values.fullName.toLowerCase();
    args.values.civilID = await bcrypt.hash(args.values.civilID, 10);
    const user = User.build(args.values);
    await user.save();
    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET!);
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      ...(process.env.NODE_ENV !== "development" && { sameSite: "none" }),
      secure: process.env.NODE_ENV !== "development"
    });

    return { token };
  },
  async loginUser(prt: any, args: { fullName: string; civilID: string }, { res }: Context) {
    loginValidation(args);
    const user = await User.findOne({ fullName: args.fullName.toLowerCase() });
    if (!user) {
      throw new ForbiddenError("Invalid name or civil ID");
    }
    const isMatch = await bcrypt.compare(args.civilID, user.civilID);
    if (!isMatch) {
      throw new ForbiddenError("Invalid name or civil ID");
    }
    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET!);
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      ...(process.env.NODE_ENV !== "development" && { sameSite: "none" }),
      secure: process.env.NODE_ENV !== "development"
    });
    return { token };
  }
};
