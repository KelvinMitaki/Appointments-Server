import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();

export const UserSubscriptions = {
  addMessage: {
    subscribe: () => pubsub.asyncIterator(["ADD_MESSAGE"])
  }
};
