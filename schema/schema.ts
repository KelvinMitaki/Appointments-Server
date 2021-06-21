import { gql } from 'apollo-server-express';
const typeDefs = gql`
  type Query {
    fetchCurrentUser: User
    fetchPosts: [Post!]!
    fetchComments(postID: ID!): [Comment!]!
    fetchUsers: [User!]!
    fetchMessages(receiverID: ID!): [Message!]!
    fetchAppointMents: [AppointMent!]!
    fetchHealthMessages: [HealthMessage!]!
    getSignedUrl: SignedUrl!
    fetchEducation: Education!
  }
  type Mutation {
    registerUser(values: RegisterUserInput!): Token!
    loginUser(fullName: String!, civilID: ID!): Token!
    createPost(message: String!, imageUrl: String): Post!
    createComment(message: String!, post: String!): Comment!
    likePost(postID: ID!): Post!
    likeComment(commentID: ID!): Comment!
    addMessage(receiver: String!, message: String!): Message!
    readMessage(reader: String!, messageID: ID!): Message!
    addAppointMent(patient: String!, date: String!): AppointMent!
    addHealthMessage(title: String!, body: String!): HealthMessage!
    deleteHealthMessage(_id: ID!): HealthMessage!
    editEducation(message: String!, youtubeLink: String!): Education!
    logoutUser: Token
  }

  type Subscription {
    addMessage(receiverID: String!, senderID: ID!): Message!
  }
  type Token {
    token: String!
  }
  type User {
    _id: ID!
    fullName: String!
    civilID: ID!
    age: Int!
    isDoctor: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Post {
    _id: ID!
    author: User!
    message: String!
    likes: [String!]!
    createdAt: String!
    updatedAt: String!
    comments: Int!
    imageUrl: String
  }
  type Comment {
    _id: ID!
    author: User!
    post: String!
    message: String!
    likes: [String!]!
    createdAt: String!
    updatedAt: String!
  }
  type Message {
    _id: ID!
    sender: String!
    receiver: String!
    message: String!
    createdAt: String!
    updatedAt: String!
    read: [String!]!
  }
  type AppointMent {
    _id: ID!
    patient: User!
    doctor: String!
    date: String!
    createdAt: String!
    updatedAt: String!
  }
  type HealthMessage {
    _id: ID!
    title: String!
    body: String!
    doctor: String!
    createdAt: String!
    updatedAt: String!
  }
  type SignedUrl {
    key: String!
    url: String!
  }
  type Education {
    youtubeLink: String!
    message: String!
    doctor: String!
  }
  input RegisterUserInput {
    fullName: String!
    civilID: ID!
    age: Int!
    isDoctor: Boolean!
  }
`;

export default typeDefs;
