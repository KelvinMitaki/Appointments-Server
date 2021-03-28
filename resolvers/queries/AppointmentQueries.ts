import { Context } from "..";
import { doctorAuth } from "../../middlewares/auth";
import AppointMent from "../../models/Appointment";

export const AppointmentQueries = {
  fetchAppointMents(prt: any, args: any, { req }: Context) {
    doctorAuth(req);
    return AppointMent.find({ date: { $gte: Date.now() } })
      .populate("patient")
      .limit(50);
  }
};
