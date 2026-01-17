# 🔐 Environment Variables Guide

> **Environment configuration for LogicNomad**

This document describes all environment variables used in the LogicNomad project.

## 📋 Quick Start

1. **Copy example files:**
   ```bash
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env
   ```

2. **Update values** in `.env` files with your configuration

3. **Restart** your development servers

---

## 🔧 API Environment Variables

Location: `apps/api/.env`

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | API server port |
| `NODE_ENV` | `development` | Environment mode (`development`, `production`, `test`) |
| `FRONTEND_URL` | `http://localhost:5173` | Frontend URL for CORS configuration |
| `JWT_SECRET` | `logicnomad-dev-secret...` | Secret key for JWT token signing (⚠️ **Change in production!**) |
| `JWT_EXPIRES_IN` | `7d` | JWT token expiration time (e.g., `7d`, `24h`, `1h`) |
| `GRAPHQL_PLAYGROUND` | `true` | Enable GraphQL Playground (development only) |
| `GRAPHQL_INTROSPECTION` | `true` | Enable GraphQL introspection (development only) |

### Production Notes

⚠️ **Important**: In production:
- Set `NODE_ENV=production`
- Use a strong, random `JWT_SECRET` (at least 32 characters)
- Set `GRAPHQL_PLAYGROUND=false`
- Set `GRAPHQL_INTROSPECTION=false`
- Configure proper `FRONTEND_URL` for your domain

---

## 🌐 Web App Environment Variables

Location: `apps/web/.env`

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:3000` | Backend API URL |
| `VITE_GRAPHQL_URL` | `http://localhost:3000/graphql` | GraphQL endpoint URL |
| `VITE_APP_NAME` | `LogicNomad` | Application name |
| `VITE_APP_VERSION` | `1.0.0` | Application version |
| `VITE_ENABLE_ANALYTICS` | `false` | Enable analytics tracking |
| `VITE_ENABLE_ERROR_REPORTING` | `false` | Enable error reporting |

### Vite Environment Variables

⚠️ **Note**: All web app environment variables must be prefixed with `VITE_` to be accessible in the browser.

---

## 🚀 Development Setup

### 1. Create Environment Files

```bash
# API
cd apps/api
cp .env.example .env

# Web
cd apps/web
cp .env.example .env
```

### 2. Update Values

Edit `.env` files and update values as needed:

**apps/api/.env:**
```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

**apps/web/.env:**
```env
VITE_API_URL=http://localhost:3000
VITE_GRAPHQL_URL=http://localhost:3000/graphql
```

### 3. Start Development

```bash
# From root
yarn dev

# Or separately
yarn dev:api  # API on port 3000
yarn dev:web  # Web on port 5173
```

---

## 🔒 Security Best Practices

### Development
- ✅ Use `.env.example` files (committed to git)
- ✅ Use `.env` files (ignored by git)
- ✅ Use weak secrets for local development (OK)

### Production
- ⚠️ **Never commit `.env` files to git**
- ⚠️ **Use strong, random secrets** (generate with: `openssl rand -base64 32`)
- ⚠️ **Set `NODE_ENV=production`**
- ⚠️ **Disable GraphQL Playground** (`GRAPHQL_PLAYGROUND=false`)
- ⚠️ **Use environment-specific values** (different secrets per environment)
- ⚠️ **Store secrets securely** (use secret management services in production)

---

## 📝 Environment File Structure

```
LogicNomad/
├── apps/
│   ├── api/
│   │   ├── .env.example  ✅ Committed to git
│   │   └── .env          ❌ Ignored by git
│   └── web/
│       ├── .env.example  ✅ Committed to git
│       └── .env          ❌ Ignored by git
└── .gitignore            ✅ Excludes .env files
```

---

## 🔄 Environment-Specific Configurations

### Development
```env
# API
NODE_ENV=development
GRAPHQL_PLAYGROUND=true
GRAPHQL_INTROSPECTION=true

# Web
VITE_API_URL=http://localhost:3000
```

### Production
```env
# API
NODE_ENV=production
GRAPHQL_PLAYGROUND=false
GRAPHQL_INTROSPECTION=false
JWT_SECRET=<strong-random-secret>

# Web
VITE_API_URL=https://api.logicnomad.com
VITE_GRAPHQL_URL=https://api.logicnomad.com/graphql
```

### Testing
```env
# API
NODE_ENV=test
JWT_SECRET=test-secret-key
```

---

## 🛠️ Troubleshooting

### Environment variables not loading?

1. **Check file location**: `.env` must be in `apps/api/` or `apps/web/` directory
2. **Check variable names**: Web app variables must start with `VITE_`
3. **Restart server**: Environment variables are loaded at startup
4. **Check .gitignore**: Ensure `.env` is ignored (not committed)

### API can't connect to frontend?

- Check `FRONTEND_URL` in `apps/api/.env` matches your frontend URL
- Verify CORS is enabled in `main.ts`
- Check browser console for CORS errors

### GraphQL Playground not working?

- Ensure `GRAPHQL_PLAYGROUND=true` in `apps/api/.env`
- Check `NODE_ENV` is not `production`
- Verify GraphQL module is configured correctly

---

## 📚 Related Documentation

- [Development Guide](./DEVELOPMENT.md) - Setup and development workflow
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment
- [Architecture Guide](./ARCHITECTURE.md) - System architecture

---

**Last Updated**: 2024  
**Version**: 1.0.0
