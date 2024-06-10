const { gql } = require('apollo-server-express');
const lottieTypeDef = require('./lottie');

const typeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [
  typeDefs,
  lottieTypeDef
]

