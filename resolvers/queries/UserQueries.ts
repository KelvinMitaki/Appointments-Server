import { Context } from '..';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import { patientAuth } from '../../middlewares/auth';
import {
  Maybe,
  QueryResolvers,
  ResolverTypeWrapper,
  User as UserInterface,
} from '../../generated/graphql';

export const UserQueries: QueryResolvers<Context> = {
  async fetchCurrentUser(_, __, { req }): Promise<Maybe<ResolverTypeWrapper<UserInterface>>> {
    if (!req.cookies || Object.keys(req.cookies).length === 0) {
      return null;
    }
    let split_token = req.cookies['client_token'];

    if (!split_token) {
      split_token = req.cookies['token'];
    }
    if (!split_token) {
      return null;
    }

    try {
      const user = jwt.verify(split_token, process.env.JWT_SECRET!);
      return user as unknown as Promise<Maybe<ResolverTypeWrapper<UserInterface>>>;
    } catch (error) {
      console.log({ error });
      return null;
    }
  },
  async fetchUsers(_, __, { req }) {
    const patient = patientAuth(req, true);
    return User.find({ _id: { $ne: patient._id }, isDoctor: false }).limit(
      50
    ) as unknown as Promise<ResolverTypeWrapper<UserInterface>[]>;
  },
};
