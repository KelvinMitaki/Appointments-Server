import { gql } from "apollo-server-express";
const typeDefs = gql`
  type Query {
    fetchCurrentUser: User
    fetchPosts: [Post!]!
    fetchComments(postID: String!): [Comment!]!
  }
  type Mutation {
    registerUser(values: RegisterUserInput): Token!
    loginUser(fullName: String!, civilID: String!): Token!
    createPost(message: String!): Post!
    createComment(message: String!, post: String!): Comment!
  }
  type Token {
    token: String!
  }
  type User {
    fullName: String!
    civilID: String!
    age: Int!
    isDoctor: Boolean!
    _id: String!
    createdAt: String!
    updatedAt: String!
  }
  type Post {
    _id: String!
    author: User!
    message: String!
    likes: [String!]!
    createdAt: String!
    updatedAt: String!
    comments: Int!
  }
  type Comment {
    _id: String!
    author: User!
    post: String!
    message: String!
    likes: [String!]!
    createdAt: String!
    updatedAt: String!
  }
  input RegisterUserInput {
    fullName: String!
    civilID: String!
    age: Int!
    isDoctor: Boolean!
  }
`;

export default typeDefs;
