import { gql } from "apollo-server-express";
const typeDefs = gql`
  type Query {
    fetchCurrentUser: User
  }
  type Mutation {
    registerUser(values: RegisterUserInput): Token!
    loginUser(fullName: String!, civilID: String!): Token!
    createPost(message: String!): Post!
    createComment(message: String!): Comment!
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
    author: User!
    message: String!
    likes: [String!]!
    createdAt: String!
    updatedAt: String!
  }
  type Comment {
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
