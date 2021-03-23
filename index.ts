import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import resolvers from "./resolvers";
import typeDefs from "./schema/schema";

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
server
  .listen()
  .then(({ port }) => console.log(`server started on port ${port}`));
