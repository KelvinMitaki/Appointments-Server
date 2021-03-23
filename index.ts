import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./schema/schema";

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ port }) => console.log(`server started on port ${port}`));
