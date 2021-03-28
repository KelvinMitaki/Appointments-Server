import mongoose from "mongoose";

export interface HealthMessageAttrs {
  title: string;
  body: string;
  doctor: string;
  deleted?: boolean;
  deletee?: string;
}

export interface HealthMessageDoc extends mongoose.Document {
  title: string;
  body: string;
  doctor: string;
  deleted?: boolean;
  deletee?: string;
}

interface HealthMessageModel extends mongoose.Model<HealthMessageDoc> {
  build: (attrs: HealthMessageAttrs) => HealthMessageDoc;
}

const HealthMessageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    deletee: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

HealthMessageSchema.statics.build = (attrs: HealthMessageAttrs) => {
  return new HealthMessage(attrs);
};

const HealthMessage = mongoose.model<HealthMessageDoc, HealthMessageModel>(
  "HealthMessage",
  HealthMessageSchema
);

export default HealthMessage;
