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
    const message = Message.build({
      ...args,
      sender: sender._id,
      read: [sender._id]
    });
    await message.save();
    pubsub.publish("ADD_MESSAGE", {
      addMessage: {
        ...message.toObject()
      }
    });
    return message;
  },
  readMessage(
    prt: any,
    args: { sender: string; receiver: string; messageID: string },
    { req }: Context
  ) {
    patientAuth(req);
    return Message.findByIdAndUpdate(
      args.messageID,
      { read: [args.sender, args.receiver] },
      { new: true }
    );
  }
};
