/**
 * GraphQL queries for authentication
 */

import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      username
      createdAt
    }
  }
`;
