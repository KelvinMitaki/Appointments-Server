import { Context } from "..";

export const PostMutations = {
  async createPost(
    prt: any,
    args: { message: string },
    { req, res }: Context
  ) {},
  async createComment(
    prt: any,
    args: { message: string },
    { req, res }: Context
  ) {}
};
