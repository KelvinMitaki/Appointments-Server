import { Context } from '..';
import {
  HealthMessage as HealthMessageInterface,
  Message as MessageInterface,
  QueryResolvers,
  ResolverTypeWrapper,
} from '../../generated/graphql';
import { patientAuth } from '../../middlewares/auth';
import HealthMessage from '../../models/HealthMessage';
import Message from '../../models/Message';

export const MessageQueries: QueryResolvers<Context> = {
  fetchMessages(prt, args, { req }) {
    const patient = patientAuth(req);
    return Message.find({
      $or: [
        { sender: patient._id, receiver: args.receiverID },
        { receiver: patient._id, sender: args.receiverID },
      ],
    }).limit(50) as unknown as ResolverTypeWrapper<MessageInterface>[];
  },
  fetchHealthMessages(prt, args, { req }) {
    patientAuth(req, true);
    return HealthMessage.find({ deleted: false })
      .limit(50)
      .sort({ _id: -1 }) as unknown as ResolverTypeWrapper<HealthMessageInterface>[];
  },
};
