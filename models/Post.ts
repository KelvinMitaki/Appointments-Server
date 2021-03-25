import mongoose from "mongoose";

export interface PostAttrs {
  author: string;
  message: string;
  likes?: string[];
}

export interface PostDoc extends mongoose.Document {
  author: string;
  message: string;
  likes?: string[];
}

interface PostModel extends mongoose.Model<PostDoc> {
  build: (attrs: PostAttrs) => PostDoc;
}

const PostSchema = new mongoose.Schema(
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
    likes: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

PostSchema.statics.build = (attrs: PostAttrs) => {
  return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>("Post", PostSchema);

export default Post;
