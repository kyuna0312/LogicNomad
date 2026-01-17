/**
 * GraphQL mutations for users
 */

import { gql } from '@apollo/client';

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      message
    }
  }
`;

export const CHANGE_EMAIL_MUTATION = gql`
  mutation ChangeEmail($input: ChangeEmailInput!) {
    changeEmail(input: $input) {
      message
      token
    }
  }
`;

export const VERIFY_EMAIL_CHANGE_MUTATION = gql`
  mutation VerifyEmailChange($input: VerifyEmailInput!) {
    verifyEmailChange(input: $input) {
      message
    }
  }
`;

export const SAVE_PROGRESS_MUTATION = gql`
  mutation SaveProgress($input: ProgressInput!) {
    saveProgress(input: $input) {
      message
    }
  }
`;
