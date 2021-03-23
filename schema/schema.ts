import { gql } from "apollo-server";
const typeDefs = gql`
  type Book {
    title: String!
    author: String!
  }
  type User {
    fullName: String!
    civilID: String!
    age: Int!
    isDoctor: Boolean!
  }
  type Query {
    books: [Book]!
  }
  type Mutation {
    registerUser(values: RegisterUserInput): Token!
    loginUser(fullName: String!, civilID: String!): Token!
  }
  type Token {
    token: String!
  }
  input RegisterUserInput {
    fullName: String!
    civilID: String!
    age: Int!
    isDoctor: Boolean!
  }
`;

export default typeDefs;
