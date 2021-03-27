import { Context } from "..";
import { patientAuth } from "../../middlewares/auth";
import Message from "../../models/Message";

export const MessageQueries = {
  fetchMessages(prt: any, args: { receiverID: string }, { req }: Context) {
    const patient = patientAuth(req);
    return Message.find({
      $or: [
        { sender: patient._id, receiver: args.receiverID },
        { receiver: patient._id, sender: args.receiverID }
      ]
    }).limit(50);
  }
};
