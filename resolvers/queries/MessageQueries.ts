import { Context } from "..";
import { patientAuth } from "../../middlewares/auth";
import Message from "../../models/Message";

export const MessageQueries = {
  fetchMessages(prt: any, args: { receiverID: string }, { req }: Context) {
    const patient = patientAuth(req);
    return Message.find({
      sender: patient._id,
      receiver: args.receiverID
    }).limit(50);
  }
};
