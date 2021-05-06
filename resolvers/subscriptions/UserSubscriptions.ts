import { PubSub, withFilter } from "graphql-subscriptions";
import { MessageDoc } from "../../models/Message";

export const pubsub = new PubSub();

export const UserSubscriptions = {
  addMessage: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(["ADD_MESSAGE"]),
      (payload, variables: { receiverID: string; senderID: string }) => {
        let { receiver, sender }: MessageDoc = payload.addMessage;
        let { receiverID, senderID } = variables;
        receiver = receiver.toString();
        sender = sender.toString();
        receiverID = receiverID.toString();
        senderID = senderID.toString();
        return (
          (receiver === receiverID && senderID === sender) ||
          (receiver === senderID && sender === receiverID)
        );
      }
    )
  }
};
