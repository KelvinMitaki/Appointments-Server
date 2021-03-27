import { Request, Response } from "express";
import { PostMutations } from "./mutations/PostMutations";
import { UserMutations } from "./mutations/UserMutations";
import { PostQueries } from "./queries/PostQueries";
import { UserQueries } from "./queries/UserQueries";
import { UserSubscriptions } from "./subscriptions/UserSubscriptions";

export interface Context {
  req: Request;
  res: Response;
}

const resolvers = {
  Query: {
    ...UserQueries,
    ...PostQueries
  },
  Mutation: {
    ...UserMutations,
    ...PostMutations
  },
  Subscription: {
    ...UserSubscriptions
  }
};

export default resolvers;
