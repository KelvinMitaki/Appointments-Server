import mongoose from "mongoose";

export interface EducationAttrs {
  youtubeLink: string;
  message: string;
  doctor: string;
}

export interface EducationDoc extends mongoose.Document {
  youtubeLink: string;
  message: string;
  doctor: string;
}

interface EducationModel extends mongoose.Model<EducationDoc> {
  build: (attrs: EducationAttrs) => EducationDoc;
}

const EducationSchema = new mongoose.Schema(
  {
    youtubeLink: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

EducationSchema.statics.build = (attrs: EducationAttrs) => {
  return new Education(attrs);
};

const Education = mongoose.model<EducationDoc, EducationModel>(
  "Education",
  EducationSchema
);

export default Education;
