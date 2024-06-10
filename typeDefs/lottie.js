const { gql } = require("apollo-server-express");

const lottieTypeDef = gql`
  scalar Upload

  type Lottie {
    id: ID
    filename: String
    mimetype: String
    encoding: String
    url: String
    name: String
    description: String
    isValidLottie: Boolean
    _id: String
    createdAt: String,
    updatedAt: String,
  }

  type Query {
    lotties: [Lottie]
    lottie(id: ID!): Lottie
    searchLotties(query: String!): [Lottie]
  }

  type Mutation {
    uploadLottie(file: Upload!, name: String!, description: String!): Lottie!
  }
`;

module.exports = lottieTypeDef;
