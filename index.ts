import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import resolvers from "./resolvers";
import typeDefs from "./schema/schema";

const app = express();

app.set("trust proxy", "1");
app.use(cookieParser());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req, res }) {
    return {
      req,
      res
    };
  }
});

server.applyMiddleware({
  app,
  path: "/graphql",
  cors: {
    credentials: true,
    origin: "http://localhost:3001"
  }
});

const mongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("connected to the database");
  } catch (error) {
    console.log(error);
  }
};
mongooseConnect();

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`server started on ${server.graphqlPath}`)
);
