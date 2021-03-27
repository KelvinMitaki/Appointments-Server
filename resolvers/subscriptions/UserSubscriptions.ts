import { PubSub, withFilter } from "graphql-subscriptions";

export const pubsub = new PubSub();

export const UserSubscriptions = {
  addMessage: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(["ADD_MESSAGE"]),
      (payload, variables) => {
        return payload.addMessage.receiver.toString() === variables.receiverID;
      }
    )
  }
};
