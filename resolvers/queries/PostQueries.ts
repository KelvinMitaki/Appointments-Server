import { Context } from "..";
import { patientAuth } from "../../middlewares/auth";
import Comment from "../../models/Comment";
import Post from "../../models/Post";

export const PostQueries = {
  async fetchPosts(prt: any, args: any, { req }: Context) {
    patientAuth(req, true);
    const postNum = await Post.countDocuments();
    return Post.find()
      .limit(50)
      .skip(postNum > 50 ? postNum - 50 : 0)
      .populate("author")
      .sort({ _id: -1 });
  },
  async fetchComments(prt: any, args: { postID: string }, { req }: Context) {
    patientAuth(req, true);
    const commentNum = await Comment.countDocuments({ post: args.postID });
    return Comment.find({ post: args.postID })
      .limit(50)
      .skip(commentNum > 50 ? commentNum - 50 : 0)
      .populate("author")
      .sort({ _id: -1 });
  }
};
