import mongoose from "mongoose";

export interface PostAttrs {
  author: string;
  message: string;
  likes?: string[];
}

interface PostDoc extends mongoose.Document {
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
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    likes: [
      {
        type: String,
        required: true
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
