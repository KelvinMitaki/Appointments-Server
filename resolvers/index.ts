import { Request, Response } from "express";
import { PostMutations } from "./mutations/PostMutations";
import { UserMutations } from "./mutations/UserMutations";
import { PostQueries } from "./queries/PostQueries";
import { UserQueries } from "./queries/UserQueries";

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
  }
};

export default resolvers;
