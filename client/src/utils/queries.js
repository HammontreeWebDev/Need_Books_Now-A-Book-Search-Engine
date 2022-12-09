import { gql } from '@apollo/client';

export const GET_ME = gql`
  get me {
    me {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
      bookCount
    }
  }
`;