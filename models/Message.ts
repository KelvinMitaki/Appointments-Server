import mongoose from "mongoose";

export interface MessageAttrs {
  sender: string;
  receiver: string;
  message: string;
  read: string[];
}

export interface MessageDoc extends mongoose.Document {
  sender: string;
  receiver: string;
  message: string;
  read: string[];
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
    },
    read: [
      {
        type: String,
        required: true,
        ref: "User"
      }
    ]
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
