const { gql } = require('apollo-server')

const typeDefs = gql`
  type Author {
    name: String!
    id: ID
    born: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]
    id: ID!
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(name: String, genre: String): [Book!]!
    allAuthor: [Author!]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    editAuthor(name: String, setBornTo: Int): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs
