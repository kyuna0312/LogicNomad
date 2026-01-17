# LogicNomad API

NestJS API for the LogicNomad monorepo with full authentication and user management.

## 🚀 Features

- ✅ User registration and login
- ✅ JWT authentication
- ✅ Password reset (forgot password)
- ✅ Change password
- ✅ Change email with verification
- ✅ Progress sync (save/load user progress)
- ✅ Guest mode support (public routes)
- ✅ Input validation with class-validator
- ✅ CORS enabled for frontend

## 📦 Installation

```bash
yarn install
```

## 🏃 Running the API

```bash
# Development mode (with hot reload)
yarn start:dev

# Production mode
yarn start:prod

# Build
yarn build
```

The API will run on `http://localhost:3000` by default.

## 🔌 API Endpoints

### Public Endpoints (No Authentication Required)

#### Health Check
```
GET /health
```
Returns API health status.

#### Register
```
POST /auth/register
Body: {
  email: string,
  password: string,
  name?: string
}
```

#### Login
```
POST /auth/login
Body: {
  email: string,
  password: string
}
```

#### Forgot Password
```
POST /auth/forgot-password
Body: {
  email: string
}
```

#### Reset Password
```
POST /auth/reset-password
Body: {
  token: string,
  newPassword: string
}
```

### Protected Endpoints (Authentication Required)

All protected endpoints require `Authorization: Bearer <token>` header.

#### Get Current User
```
GET /users/me
```

#### Change Password
```
PUT /users/password
Body: {
  currentPassword: string,
  newPassword: string
}
```

#### Change Email
```
PUT /users/email
Body: {
  newEmail: string,
  password: string
}
```

#### Verify Email Change
```
PUT /users/email/verify
Body: {
  token: string
}
```

#### Get User Progress
```
GET /users/progress
```

#### Save User Progress
```
PUT /users/progress
Body: {
  completedLevels: string[],
  currentProgress: number,
  savedAt: string
}
```

## 🔐 Authentication

### JWT Token

- **Secret**: Set via `JWT_SECRET` environment variable (default: development secret)
- **Expiration**: 7 days
- **Header**: `Authorization: Bearer <token>`

### Guest Mode

Users can use the app without authentication. Progress is saved to localStorage only.

When authenticated:
- Progress syncs to API
- Multi-device support
- Account management available

## 🛠️ Configuration

### Environment Variables

```bash
PORT=3000                    # API port
JWT_SECRET=your-secret-key   # JWT secret (change in production!)
FRONTEND_URL=http://localhost:5173  # CORS origin
```

### CORS

CORS is enabled for the frontend. Update `FRONTEND_URL` environment variable or modify `main.ts` for production.

## 📁 Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── auth.controller.ts  # Auth endpoints
│   ├── auth.service.ts     # Auth logic
│   ├── auth.module.ts      # Auth module
│   └── jwt.strategy.ts     # JWT strategy
├── users/                   # Users module
│   ├── users.controller.ts # User endpoints
│   ├── users.service.ts     # User logic
│   ├── users.module.ts      # User module
│   ├── users.dto.ts         # Validation DTOs
│   └── user.entity.ts       # User entity
├── common/                  # Shared utilities
│   ├── guards/             # Auth guards
│   ├── decorators/         # Custom decorators
│   └── dto/                # Shared DTOs
├── config/                  # Configuration
│   └── jwt.config.ts       # JWT config
├── app.module.ts           # Root module
└── main.ts                 # Entry point
```

## 🔒 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token authentication
- Input validation with class-validator
- CORS protection
- Password strength requirements
- Email validation

## 💾 Data Storage

**Current**: In-memory storage (Map-based)

**Future**: Can be easily migrated to:
- PostgreSQL
- MongoDB
- Redis
- Any database with TypeORM/Prisma

## 🧪 Testing

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## 📝 Notes

### Password Requirements

- Minimum 6 characters
- Must contain uppercase, lowercase, and number

### Email Change Flow

1. User requests email change with password
2. System generates token
3. Token sent via email (in production)
4. User verifies with token
5. Email updated

### Password Reset Flow

1. User requests password reset
2. System generates token
3. Token sent via email (in production)
4. User resets password with token
5. Password updated

## 🚧 Future Enhancements

- [ ] Database integration (PostgreSQL)
- [ ] Email service (SendGrid, AWS SES)
- [ ] Rate limiting
- [ ] Refresh tokens
- [ ] OAuth integration
- [ ] Two-factor authentication
- [ ] Account deletion
- [ ] Profile picture upload

## 📚 Related Documentation

- [Development Guide](../../docs/DEVELOPMENT.md)
- [Architecture](../../docs/ARCHITECTURE.md)
- [Improvement Suggestions](../../docs/IMPROVEMENTS.md)

---

**Status**: MVP Complete ✅ | Production Ready 🚀
