import { Context } from "..";
import { doctorAuth, patientAuth } from "../../middlewares/auth";
import HealthMessage from "../../models/HealthMessage";
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
  async readMessage(
    prt: any,
    args: { reader: string; messageID: string },
    { req }: Context
  ) {
    patientAuth(req);
    const message = await Message.findById(args.messageID);
    if (message) {
      const read = message.read.find(r => r.toString() === args.reader);
      if (!read) {
        message.read = [...message.read, args.reader];
      }
      await message.save();
    }
    return message;
  },
  async addHealthMessage(
    prt: any,
    args: { title: string; body: string },
    { req }: Context
  ) {
    const doctor = doctorAuth(req);
    const healthMessage = HealthMessage.build({ ...args, doctor: doctor._id });
    await healthMessage.save();
    return healthMessage;
  }
};
