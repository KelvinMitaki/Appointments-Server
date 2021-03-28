import { Context } from "..";
import { doctorAuth } from "../../middlewares/auth";
import AppointMent from "../../models/Appointment";

export const AppointMentMutation = {
  async addAppointMent(
    prt: any,
    args: { patient: string; date: string },
    { req }: Context
  ) {
    const doctor = doctorAuth(req);
    const appointMent = AppointMent.build({
      ...args,
      doctor: doctor._id,
      date: parseInt(args.date)
    });
    await appointMent.save();
    const populatedApp = AppointMent.findById(appointMent._id).populate(
      "patient"
    );
    return populatedApp;
  }
};