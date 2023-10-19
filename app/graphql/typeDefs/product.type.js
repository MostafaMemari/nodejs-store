const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { CategoryType, AuthorType } = require("./public.type");

const FeaturesType = new GraphQLObjectType({
  name: "features",
  fields: {
    length: { type: GraphQLString },
    height: { type: GraphQLString },
    width: { type: GraphQLString },
    weight: { type: GraphQLString },
    colors: { type: new GraphQLList(GraphQLString) },
    model: { type: GraphQLString },
    madein: { type: GraphQLString },
  },
});

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    short_text: { type: GraphQLString },
    text: { type: GraphQLString },
    imagesUrl: { type: new GraphQLList(GraphQLString) },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: CategoryType },
    price: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    count: { type: GraphQLInt },
    type: { type: GraphQLString },
    supplier: { type: AuthorType },
    features: { type: FeaturesType },
  },
});

module.exports = {
  ProductType,
};
