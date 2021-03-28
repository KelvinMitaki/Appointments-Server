import { Context } from "..";
import { patientAuth } from "../../middlewares/auth";
import AppointMent from "../../models/Appointment";

export const AppointmentQueries = {
  fetchAppointMents(prt: any, args: any, { req }: Context) {
    patientAuth(req, true);
    return AppointMent.find({ date: { $gte: Date.now() } })
      .populate("patient")
      .limit(50)
      .sort({ date: 1 });
  }
};
