import { Context } from '..';
import { AppointMent as AppointMentInterface, MutationResolvers } from '../../generated/graphql';
import { doctorAuth } from '../../middlewares/auth';
import AppointMent from '../../models/Appointment';

export const AppointMentMutation: MutationResolvers<Context> = {
  async addAppointMent(prt, args, { req }) {
    const doctor = doctorAuth(req);
    const appointMent = AppointMent.build({
      ...args,
      doctor: doctor._id,
      date: parseInt(args.date),
    });
    await appointMent.save();
    const populatedApp = AppointMent.findById(appointMent._id).populate('patient');
    return populatedApp as unknown as AppointMentInterface;
  },
};
