import mongoose from "mongoose";

export interface AppointMentAttrs {
  patient: string;
  doctor: string;
  date: number;
}

export interface AppointMentDoc extends mongoose.Document {
  patient: string;
  doctor: string;
  date: number;
}

interface AppointMentModel extends mongoose.Model<AppointMentDoc> {
  build: (attrs: AppointMentAttrs) => AppointMentDoc;
}

const AppointMentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

AppointMentSchema.statics.build = (attrs: AppointMentAttrs) => {
  return new AppointMent(attrs);
};

const AppointMent = mongoose.model<AppointMentDoc, AppointMentModel>(
  "AppointMent",
  AppointMentSchema
);

export default AppointMent;
