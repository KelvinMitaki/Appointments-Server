import { Context } from '..';
import {
  HealthMessage as HealthMessageInterface,
  Message as MessageInterface,
  MutationResolvers,
} from '../../generated/graphql';
import { doctorAuth, patientAuth } from '../../middlewares/auth';
import HealthMessage from '../../models/HealthMessage';
import Message from '../../models/Message';
import { pubsub } from '../subscriptions/UserSubscriptions';

export const MessageMutations: MutationResolvers<Context> = {
  async addMessage(prt, args, { req }) {
    const sender = patientAuth(req);
    const message = Message.build({
      ...args,
      sender: sender._id,
      read: [sender._id],
    });
    await message.save();
    pubsub.publish('ADD_MESSAGE', {
      addMessage: {
        ...message.toObject(),
      },
    });
    return message as unknown as MessageInterface;
  },
  async readMessage(prt, args, { req }) {
    patientAuth(req);
    const message = await Message.findById(args.messageID);
    if (message) {
      const read = message.read.find((r) => r.toString() === args.reader);
      if (!read) {
        message.read = [...message.read, args.reader];
      }
      await message.save();
    }
    return message as unknown as MessageInterface;
  },
  async addHealthMessage(prt, args, { req }) {
    const doctor = doctorAuth(req);
    const healthMessage = HealthMessage.build({ ...args, doctor: doctor._id });
    await healthMessage.save();
    return healthMessage as unknown as HealthMessageInterface;
  },
  deleteHealthMessage(prt, args, { req }) {
    const doc = doctorAuth(req);
    return HealthMessage.findByIdAndUpdate(
      args._id,
      { deleted: true, deletee: doc._id },
      { new: true }
    ) as unknown as HealthMessageInterface;
  },
};
