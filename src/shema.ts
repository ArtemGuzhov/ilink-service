import { gql } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { IResolvers } from "@graphql-tools/utils";
import { JokeModel } from "./Joke";

const typeDefs = gql`
  type Joke {
    id: String!
    value: String!
    categories: [String!]
    url: String!
    icon_url: String!
    created_at: String!
    updated_at: String!
  }

  type Query {
    categories: [String!]
    categoryJoke(category: String!): Joke!
    queryJoke(query: String!): [Joke!]
    countJokes: Int!
    favoriteJokes: [Joke!]
  }

  type Mutation {
    addJoke(id: String!): String!
  }
`;

const resolvers: IResolvers = {
  Query: {
    categories: (_, __, { dataSources }) => {
      console.log("categories");

      console.log(dataSources.chuckApi.context);

      return dataSources.chuckApi.getAllCategories();
    },
    categoryJoke: (_, { category }, { dataSources }) =>
      dataSources.chuckApi.getCategoryJoke(category),
    queryJoke: (_, { query }, { dataSources }) =>
      dataSources.chuckApi.getQueryJoke(query),
    countJokes: (_, __, { dataSources }) =>
      dataSources.chuckApi.getCountJokes(),
    favoriteJokes: async () => {
      const jokes = await JokeModel.find().select("-_id").select("-__v");

      return jokes;
    },
  },
  Mutation: {
    addJoke: async (_, { id }, { dataSources }) => {
      try {
        const joke = await dataSources.chuckApi.getJokeById(id);

        const jokeExist = JokeModel.findById(id);

        if (!!jokeExist) {
          return "This joke already exists";
        }

        const favoriteJoke = new JokeModel(joke);

        await favoriteJoke.save();

        return "Joke added!";
      } catch (error) {
        return "Error";
      }
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
