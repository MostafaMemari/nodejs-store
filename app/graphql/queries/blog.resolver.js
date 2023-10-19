const { GraphQLList } = require("graphql");
const { blogType } = require("../typeDefs/blog.type");
const { BlogModel } = require("../../models/blogs");

const BlogResolver = {
  type: new GraphQLList(blogType),
  resolve: async () => {
    return await BlogModel.find({}).populate("author");
  },
};
module.exports = {
  BlogResolver,
};
