import { ApolloServer } from "apollo-server-express";
import os from "os";
import cluster from "cluster";
import mongoose from "mongoose";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import resolvers from "./resolvers";
import typeDefs from "./schema/schema";

if (cluster.isMaster) {
  const n_cpus = os.cpus().length;
  console.log(`forking ${n_cpus} processes`);
  for (let i = 0; i < n_cpus; i++) {
    cluster.fork();
  }
} else {
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
    },
    subscriptions: {
      onConnect: () => console.log("connected to websocket")
    }
  });

  const httpServer = http.createServer(app);

  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      credentials: true,
      origin:
        process.env.NODE_ENV === "production"
          ? "https://appointments-seven.vercel.app"
          : "http://localhost:3000"
    }
  });

  server.installSubscriptionHandlers(httpServer);

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

  httpServer.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`server started on ${server.graphqlPath}`)
  );
}
