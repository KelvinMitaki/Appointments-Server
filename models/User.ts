import mongoose from "mongoose";

export interface UserAttrs {
  fullName: string;
  civilID: string;
  age: number;
  isDoctor: boolean;
}

interface UserDoc extends mongoose.Document {
  fullName: string;
  civilID: string;
  age: number;
  isDoctor: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build: (attrs: UserAttrs) => UserDoc;
}

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true
    },
    civilID: {
      type: String,
      required: true,
      unique: true
    },
    age: {
      type: Number,
      required: true
    },
    isDoctor: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export default User;
