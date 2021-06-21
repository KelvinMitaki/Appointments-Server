import { Context } from '..';
import {
  AppointMent as AppointMentInterface,
  QueryResolvers,
  ResolverTypeWrapper,
} from '../../generated/graphql';
import { patientAuth } from '../../middlewares/auth';
import AppointMent from '../../models/Appointment';

export const AppointmentQueries: QueryResolvers<Context> = {
  fetchAppointMents(prt, args, { req }) {
    patientAuth(req, true);
    return AppointMent.find({ date: { $gte: Date.now() } })
      .populate('patient')
      .limit(50)
      .sort({ date: 1 }) as unknown as ResolverTypeWrapper<AppointMentInterface>[];
  },
};
