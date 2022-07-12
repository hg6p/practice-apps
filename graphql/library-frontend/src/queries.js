import { gql } from '@apollo/client'
export const ALL_AUTHORS = gql`
  query {
    allAuthor {
      name
      born
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
      genres
    }
  }
`
export const BOOKS_BY_GENRE = gql`
  query bookByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`
export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`
export const UPDATE_BIRTH_YEAR = gql`
  mutation editBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
const BOOK_DETAILS = gql`
  fragment bookDetails on Person {
    title
    published
    genres
    author {
      name
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...PersonDetails
    }
  }
  ${BOOK_DETAILS}
`
