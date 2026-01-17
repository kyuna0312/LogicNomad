/**
 * GraphQL queries for users
 */

import { gql } from '@apollo/client';

export const GET_PROGRESS_QUERY = gql`
  query GetProgress {
    getProgress {
      completedLevels
      currentProgress
    }
  }
`;
