const { gql } = require('apollo-server-express');

const typeDefs = gql` 
type Query {
    me(username: String!): User 
}

type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth

    saveBook(authors: [String]!, description: String!, bookId: ID!, image: String!, link: String!, title: String! ): User

    removeBook(bookId: ID!): User
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]! 
}

type Book {
    bookId: ID!
    authors: [String]!
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}
`;

module.exports = typeDefs;