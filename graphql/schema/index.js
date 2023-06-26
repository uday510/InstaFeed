const { buildSchema } = require("graphql");
const { gql } = require("apollo-server");

module.exports = buildSchema(`
        scalar Upload
        type User {
          _id : ID!
          email: String!
          password: String
        }
        type Post {
          _id: ID!
          author: User!
          imageUrls: [String!]
          likes: [User!]
          dislikes:[User!]
          createdAt: String!
          updatedAt: String! 
          caption: String!
          comment: String!
        }
        type AuthData {
          userId: ID!
          token: String!
          tokenExpiration: Int!
        }
        input UserInput {
          email: String!
          password: String!
        }
        input PostInput {
          caption: String
          comment: String
        }
      type RootQuery {
        login(email: String!, password: String!): AuthData!
        getPostById(id: String!): Post!
      }
      type RootMutation {
        createUser(userInput: UserInput): User
        createPost(postInput: PostInput): Post
      }
      schema {
          query: RootQuery
          mutation: RootMutation
      }
`);
