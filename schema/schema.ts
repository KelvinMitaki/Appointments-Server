import { gql } from "apollo-server-express";
const typeDefs = gql`
  type Query {
    fetchCurrentUser: User
    fetchPosts: [Post!]!
    fetchComments(postID: String!): [Comment!]!
    fetchUsers: [User!]!
    fetchMessages(receiverID: String!): [Message!]!
    fetchAppointMents: [AppointMent!]!
    fetchHealthMessages: [HealthMessage!]!
    getSignedUrl: SignedUrl!
    fetchEducation: Education!
  }
  type Mutation {
    registerUser(values: RegisterUserInput): Token!
    loginUser(fullName: String!, civilID: String!): Token!
    createPost(message: String!, imageUrl: String): Post!
    createComment(message: String!, post: String!): Comment!
    likePost(postID: String!): Post!
    likeComment(commentID: String!): Comment!
    addMessage(receiver: String!, message: String!): Message!
    readMessage(reader: String!, messageID: String!): Message!
    addAppointMent(patient: String!, date: String!): AppointMent!
    addHealthMessage(title: String!, body: String!): HealthMessage!
    deleteHealthMessage(_id: String!): HealthMessage!
    editEducation(message: String!, youtubeLink: String!): Education!
    logoutUser: String!
  }

  type Subscription {
    addMessage(receiverID: String!, senderID: String!): Message!
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
    imageUrl: String
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
  type Message {
    _id: String!
    sender: String!
    receiver: String!
    message: String!
    createdAt: String!
    updatedAt: String!
    read: [String!]!
  }
  type AppointMent {
    _id: String!
    patient: User!
    doctor: String!
    date: String!
    createdAt: String!
    updatedAt: String!
  }
  type HealthMessage {
    _id: String!
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
    civilID: String!
    age: Int!
    isDoctor: Boolean!
  }
`;

export default typeDefs;
