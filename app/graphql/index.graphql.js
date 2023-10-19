const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./typeDefs/blog.resolver");
// query . mutations , schema , types
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: BlogResolver,
  },
});
const RootMutation = new GraphQLObjectType({
  name: "Mutations",
  fields: {},
});
const graphQLSchema = new GraphQLSchema({
  query: RootQuery,
  // mutation: RootMutation,
});
module.exports = {
  graphQLSchema,
};
