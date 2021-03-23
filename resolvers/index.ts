const resolvers = {
  Query: {
    books() {
      return [{ title: "new book", author: "kelvin mitaki" }];
    }
  }
};

export default resolvers;
