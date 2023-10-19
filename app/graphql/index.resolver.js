const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
// query . mutations , schema , types
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "blogsType",
          fields: {
            id: { type: GraphQLInt },
            title: { type: GraphQLString },
            text: { type: GraphQLString },
            image: { type: GraphQLString },
          },
        })
      ),
      resolve: () => {
        return [
          {
            id: 1,
            title: "title blog",
            text: "text of blog",
            image: "index.jpg",
          },
        ];
      },
    },
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
