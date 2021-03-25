import mongoose from "mongoose";

export interface CommentAttrs {
  author: string;
  message: string;
  post: string;
  likes?: string[];
}

interface CommentDoc extends mongoose.Document {
  author: string;
  message: string;
  post: string;
  likes?: string[];
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build: (attrs: CommentAttrs) => CommentDoc;
}

const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    message: {
      type: String,
      required: true
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

CommentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
  "Comment",
  CommentSchema
);

export default Comment;
