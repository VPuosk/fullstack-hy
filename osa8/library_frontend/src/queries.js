import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
    }
  }
`

export const ALL_GENRES = gql`
query {
  allBooks {
    genres
  }
}
`

export const ALL_GENRE_BOOKS = gql`
  query getGenreBooks($genreName: String!) {
    allBooks(
      genre: $genreName
    ) {
      title
      author {
        name
      }
      published
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $publishingYear: Int!, $genres: [String]!) {
    addBook(
      title: $title,
      author: $author,
      published: $publishingYear,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const AUTHOR_EDIT_YEAR = gql`
  mutation changeYear($name: String, $born: Int!) {
    editAuthor(
      name: $name
      setBornTo: $born
    ) {
      name
      born
    }
  }
`

export const USER_LOGIN = gql`
  mutation userLogin($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`