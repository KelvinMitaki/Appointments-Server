import { Request, Response } from "express";
import { AppointMentDoc } from "../models/Appointment";
import { AppointMentMutation } from "./mutations/AppointMentMutation";
import { MessageMutations } from "./mutations/MessageMutations";
import { PostMutations } from "./mutations/PostMutations";
import { UserMutations } from "./mutations/UserMutations";
import { AppointmentQueries } from "./queries/AppointmentQueries";
import { MessageQueries } from "./queries/MessageQueries";
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
    ...PostQueries,
    ...MessageQueries,
    ...AppointmentQueries
  },
  Mutation: {
    ...UserMutations,
    ...PostMutations,
    ...MessageMutations,
    ...AppointMentMutation
  },
  Subscription: {
    ...UserSubscriptions
  },
  AppointMent: {
    date(prt: AppointMentDoc) {
      return prt.date.toString();
    }
  }
};

export default resolvers;
