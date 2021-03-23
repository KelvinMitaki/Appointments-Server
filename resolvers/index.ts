import { Request, Response } from "express";
import { UserMutations } from "./mutations/UserMutations";
import { UserQueries } from "./queries/UserQueries";

export interface Context {
  req: Request;
  res: Response;
}

const resolvers = {
  Query: {
    ...UserQueries
  },
  Mutation: {
    ...UserMutations
  }
};

export default resolvers;
