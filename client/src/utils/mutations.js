import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        bookCount
        email
        savedBooks {
            title
            description
            bookId
            authors
            image
            link
        }
      }
    }
  }
`

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            bookCount
            email
            savedBooks {
                title
                description
                bookId
                authors
                image
                link
            }
        }
    }
}
`

export const SAVE_BOOK = gql`
mutation saveBook($bookData: BookData!) {
    saveBook(bookData: $bookData) {
          _id
          username
          bookCount
          email
          savedBooks {
            authors
            description
            bookId
            image
            link
            title
        }
      }
    }
`

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!){
    removeBook(bookId: $bookId) {
        user {
          _id
          username
          bookCount
          email
          savedBooks {
              title
              description
              bookId
              authors
              image
              link
          }
        }
    }
}
`