import { Context } from "..";
import { doctorAuth, patientAuth } from "../../middlewares/auth";
import HealthMessage from "../../models/HealthMessage";
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
  },
  fetchHealthMessages(prt: any, args: any, { req }: Context) {
    patientAuth(req, true);
    return HealthMessage.find({ deleted: false }).limit(50).sort({ _id: -1 });
  }
};
