import { ForbiddenError } from "apollo-server-errors";
import AWS from "aws-sdk";
import { v1 as uuidV1 } from "uuid";
import { Context } from "..";
import { doctorAuth, patientAuth } from "../../middlewares/auth";
import Comment from "../../models/Comment";
import Education from "../../models/Education";
import Post from "../../models/Post";

export const PostMutations = {
  async createPost(
    prt: any,
    args: { message: string; imageUrl?: string },
    { req, res }: Context
  ) {
    const patient = patientAuth(req);
    const post = Post.build({
      author: patient._id,
      message: args.message,
      comments: 0,
      ...(args.imageUrl && { imageUrl: args.imageUrl })
    });
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
    const post = await Post.findById(args.post);
    if (post) {
      post.comments = post.comments + 1;
      await post.save();
    }
    return { ...comment.toObject(), author: patient };
  },
  async likePost(prt: any, args: { postID: string }, { req }: Context) {
    const patient = patientAuth(req);
    const post = await Post.findById(args.postID).populate("author");
    if (post) {
      const userLiked = post.likes?.find(
        p => p.toString() === patient._id.toString()
      );
      if (userLiked) {
        post.likes = post.likes?.filter(
          id => id.toString() !== patient._id.toString()
        );
      } else {
        post.likes = [...post.likes!, patient._id];
      }
      await post.save();
      return post;
    }
    throw new ForbiddenError("No post with that id");
  },
  async likeComment(prt: any, args: { commentID: string }, { req }: Context) {
    const patient = patientAuth(req);
    const comment = await Comment.findById(args.commentID).populate("author");
    if (comment) {
      const userLiked = comment.likes?.find(
        p => p.toString() === patient._id.toString()
      );
      if (userLiked) {
        comment.likes = comment.likes?.filter(
          id => id.toString() !== patient._id.toString()
        );
      } else {
        comment.likes = [...comment.likes!, patient._id];
      }
      await comment.save();
      return comment;
    }
    throw new ForbiddenError("No comment with that id");
  },
  async editEducation(
    prt: any,
    args: { message: string; youtubeLink: string },
    { req }: Context
  ) {
    const doctor = doctorAuth(req);
    let education = await Education.findOne();
    if (!education) {
      education = Education.build({ ...args, doctor: doctor._id });
      await education.save();
    } else {
      education.message = args.message;
      education.youtubeLink = args.youtubeLink.trim();
      education.doctor = doctor._id;
      await education.save();
    }
    return education;
  }
};
