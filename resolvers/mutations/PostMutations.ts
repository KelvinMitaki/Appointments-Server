import { Context } from "..";
import { patientAuth } from "../../middlewares/auth";
import Comment from "../../models/Comment";
import Post from "../../models/Post";

export const PostMutations = {
  async createPost(prt: any, args: { message: string }, { req, res }: Context) {
    const patient = patientAuth(req);
    const post = Post.build({ author: patient._id, message: args.message });
    await post.save();
    return { ...post.toObject(), author: patient };
  },
  async createComment(
    prt: any,
    args: { message: string; post: string },
    { req, res }: Context
  ) {
    const patient = patientAuth(req);
    const comment = Comment.build({ author: patient._id, ...args });
    await comment.save();
    return comment;
  }
};
