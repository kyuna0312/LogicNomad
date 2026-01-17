# 🔷 GraphQL API Documentation

> **GraphQL API guide for LogicNomad**

This document describes the GraphQL API implementation, queries, mutations, and usage.

## 📋 Overview

LogicNomad uses **GraphQL** as the primary API interface, powered by:
- **Apollo Server** (NestJS integration)
- **Apollo Client** (React frontend)
- **Type-safe** queries and mutations
- **Auto-generated schema** from TypeScript types

## 🚀 Quick Start

### API Endpoint

- **Development**: `http://localhost:3000/graphql`
- **GraphQL Playground**: `http://localhost:3000/graphql` (development only)

### Authentication

Most queries/mutations require authentication. Include the JWT token in the `Authorization` header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📚 Schema Overview

### Types

#### UserType
```graphql
type UserType {
  id: ID!
  email: String!
  username: String
  createdAt: String
}
```

#### AuthResponse
```graphql
type AuthResponse {
  token: String!
  user: UserType!
}
```

#### ProgressType
```graphql
type ProgressType {
  completedLevels: [String!]!
  currentProgress: Int!
}
```

#### MessageResponse
```graphql
type MessageResponse {
  message: String!
  token: String
}
```

## 🔐 Authentication Mutations

### Register

Create a new user account.

```graphql
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    token
    user {
      id
      email
      username
      createdAt
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "email": "user@example.com",
    "password": "SecurePass123",
    "username": "username"
  }
}
```

### Login

Authenticate and receive a JWT token.

```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      email
      username
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "email": "user@example.com",
    "password": "SecurePass123"
  }
}
```

### Forgot Password

Request a password reset token.

```graphql
mutation ForgotPassword($input: ForgotPasswordInput!) {
  forgotPassword(input: $input) {
    message
    token
  }
}
```

### Reset Password

Reset password using a token.

```graphql
mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    message
  }
}
```

## 👤 User Queries & Mutations

### Get Current User

Get authenticated user information.

```graphql
query GetMe {
  me {
    id
    email
    username
    createdAt
  }
}
```

**Requires**: Authentication

### Change Password

Change user password.

```graphql
mutation ChangePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    message
  }
}
```

**Variables:**
```json
{
  "input": {
    "currentPassword": "OldPass123",
    "newPassword": "NewPass123"
  }
}
```

**Requires**: Authentication

### Change Email

Request email change (returns verification token).

```graphql
mutation ChangeEmail($input: ChangeEmailInput!) {
  changeEmail(input: $input) {
    message
    token
  }
}
```

### Verify Email Change

Verify and complete email change.

```graphql
mutation VerifyEmailChange($input: VerifyEmailInput!) {
  verifyEmailChange(input: $input) {
    message
  }
}
```

## 🎮 Progress Queries & Mutations

### Get Progress

Get user's game progress.

```graphql
query GetProgress {
  getProgress {
    completedLevels
    currentProgress
  }
}
```

**Requires**: Authentication

### Save Progress

Save user's game progress.

```graphql
mutation SaveProgress($input: ProgressInput!) {
  saveProgress(input: $input) {
    message
  }
}
```

**Variables:**
```json
{
  "input": {
    "completedLevels": ["level1", "level2"],
    "currentProgress": 50
  }
}
```

**Requires**: Authentication

## 🔧 Input Types

### RegisterInput
```graphql
input RegisterInput {
  email: String!
  password: String!
  username: String
}
```

### LoginInput
```graphql
input LoginInput {
  email: String!
  password: String!
}
```

### ChangePasswordInput
```graphql
input ChangePasswordInput {
  currentPassword: String!
  newPassword: String!
}
```

### ProgressInput
```graphql
input ProgressInput {
  completedLevels: [String!]!
  currentProgress: Int
}
```

## 💻 Frontend Usage

### Apollo Client Setup

The frontend uses Apollo Client configured in `apps/web/src/lib/apollo.ts`:

```typescript
import { apolloClient } from './lib/apollo';
import { LOGIN_MUTATION } from './graphql/auth/mutations';

// Execute mutation
const { data } = await apolloClient.mutate({
  mutation: LOGIN_MUTATION,
  variables: { input: { email, password } },
});
```

### Example: Login

```typescript
import { useAuthStore } from '../store/authStore';

const { login } = useAuthStore();

await login('user@example.com', 'password123');
```

## 🛡️ Security

### Public Routes

Routes marked with `@Public()` decorator don't require authentication:
- `register`
- `login`
- `forgotPassword`
- `resetPassword`

### Protected Routes

All other routes require a valid JWT token:
- `me`
- `getProgress`
- `saveProgress`
- `changePassword`
- `changeEmail`
- `verifyEmailChange`

### Rate Limiting

All GraphQL operations are rate-limited:
- **Limit**: 100 requests per minute
- **Window**: 60 seconds (1 minute)

## 📝 Error Handling

GraphQL errors follow this structure:

```json
{
  "errors": [
    {
      "message": "Error message",
      "extensions": {
        "code": "ERROR_CODE",
        "stacktrace": ["..."]
      }
    }
  ]
}
```

### Common Error Codes

- `UNAUTHORIZED` - Authentication required
- `BAD_REQUEST` - Invalid input
- `CONFLICT` - Resource conflict (e.g., email already exists)
- `NOT_FOUND` - Resource not found
- `INTERNAL_SERVER_ERROR` - Server error

## 🔍 Testing

### GraphQL Playground

1. Start the API: `yarn dev:api`
2. Open: `http://localhost:3000/graphql`
3. Use the interactive playground to test queries/mutations

### Example Test User

- **Email**: `test@example.com`
- **Password**: `Test123456`

See [TEST_USER.md](../TEST_USER.md) for more details.

## 📚 Related Documentation

- [Environment Variables](./ENVIRONMENT.md) - API configuration
- [Architecture](./ARCHITECTURE.md) - System architecture
- [Development Guide](./DEVELOPMENT.md) - Setup instructions

---

**Last Updated**: 2026-01-18  
**API Version**: 2.0.0
