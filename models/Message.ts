import mongoose from "mongoose";

export interface MessageAttrs {
  sender: string;
  receiver: string;
  message: string;
}

export interface MessageDoc extends mongoose.Document {
  sender: string;
  receiver: string;
  message: string;
}

interface MessageModel extends mongoose.Model<MessageDoc> {
  build: (attrs: MessageAttrs) => MessageDoc;
}

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

MessageSchema.statics.build = (attrs: MessageAttrs) => {
  return new Message(attrs);
};

const Message = mongoose.model<MessageDoc, MessageModel>(
  "Message",
  MessageSchema
);

export default Message;
