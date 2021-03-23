import { ForbiddenError } from "apollo-server-errors";
import { Context } from "..";
import { registerValidation } from "../../middlewares/validation";
import User, { UserAttrs } from "../../models/User";

export const UserMutations = {
  async register(prt: any, args: { values: UserAttrs }, ctx: Context) {
    registerValidation(args.values);
    const userExists = await User.exists({
      $or: [
        { fullName: args.values.fullName },
        {
          civilID: args.values.civilID
        }
      ]
    });
    if (userExists) {
      throw new ForbiddenError(
        "User with that name or civil ID already exists"
      );
    }
    const user = User.build(args.values);
    await user.save();
    return user;
  }
};
