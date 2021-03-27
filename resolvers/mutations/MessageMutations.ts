import { Context } from "..";
import { patientAuth } from "../../middlewares/auth";
import Message from "../../models/Message";
import { pubsub } from "../subscriptions/UserSubscriptions";

export const MessageMutations = {
  async addMessage(
    prt: any,
    args: {
      receiver: string;
      message: string;
    },
    { req }: Context
  ) {
    const sender = patientAuth(req);
    const message = Message.build({ ...args, sender: sender._id });
    await message.save();
    pubsub.publish("ADD_MESSAGE", {
      addMessage: {
        ...message
      }
    });
    return message;
  }
};
