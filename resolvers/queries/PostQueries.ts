import { ForbiddenError } from 'apollo-server-errors';
import AWS from 'aws-sdk';
import { v1 as uuidV1 } from 'uuid';
import { Context } from '..';
import {
  Comment as CommentInterface,
  Education as EducationInterface,
  Post as PostInterface,
  QueryResolvers,
  ResolverTypeWrapper,
} from '../../generated/graphql';
import { patientAuth } from '../../middlewares/auth';
import Comment from '../../models/Comment';
import Education from '../../models/Education';
import Post from '../../models/Post';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  signatureVersion: 'v4',
  region: 'eu-west-2',
});
export const PostQueries: QueryResolvers<Context> = {
  async fetchPosts(prt, args, { req }) {
    patientAuth(req, true);
    const postNum = await Post.countDocuments();
    return Post.find()
      .limit(50)
      .skip(postNum > 50 ? postNum - 50 : 0)
      .populate('author')
      .sort({ _id: -1 }) as unknown as ResolverTypeWrapper<PostInterface>[];
  },
  async fetchComments(prt, args: { postID: string }, { req }) {
    patientAuth(req, true);
    const commentNum = await Comment.countDocuments({ post: args.postID });
    return Comment.find({ post: args.postID })
      .limit(50)
      .skip(commentNum > 50 ? commentNum - 50 : 0)
      .populate('author')
      .sort({ _id: -1 }) as unknown as ResolverTypeWrapper<CommentInterface>[];
  },
  async getSignedUrl(prt, args, { req }) {
    const patient = patientAuth(req);
    const key = `${patient._id}/${uuidV1()}.jpeg`;
    try {
      return new Promise((resolve, reject) => {
        s3.getSignedUrl(
          'putObject',
          {
            Bucket: 'e-commerce-gig',
            ContentType: 'image/jpeg',
            Key: key,
          },
          (err, url) => {
            if (err) reject(err);
            resolve({ key, url });
          }
        );
      });
    } catch (error) {
      throw new ForbiddenError('error getting signed url' + error);
    }
  },
  fetchEducation(prt, args, { req }) {
    patientAuth(req, true);
    return Education.findOne() as unknown as ResolverTypeWrapper<EducationInterface>;
  },
};
