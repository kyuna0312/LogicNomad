import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import compression from 'compression';
import helmet from 'helmet';
import { GraphQLValidationPipe } from './common/pipes/graphql-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'production' 
      ? ['error', 'warn'] 
      : ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  
  const logger = new Logger('Bootstrap');
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Security headers (helmet)
  app.use(helmet({
    contentSecurityPolicy: isProduction,
    crossOriginEmbedderPolicy: false,
    // Performance optimizations
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }));
  
  // Compression middleware with optimizations
  app.use(compression({
    level: 6, // Balance between compression and CPU
    threshold: 1024, // Only compress responses > 1KB
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  }));

  // Ensure request object has proper structure for Passport JWT (no session needed)
  // This prevents Passport from trying to use session methods like logIn
  app.use((req: any, _res: any, next: any) => {
    // For JWT authentication, we don't need session support
    // Ensure req.user can be set without session methods
    if (!req.logIn) {
      // Mock logIn if it doesn't exist (JWT doesn't need it)
      req.logIn = (user: any, callback?: (err?: any) => void) => {
        req.user = user;
        if (callback) callback();
      };
    }
    next();
  });
  
  // Enable CORS for frontend communication
  // In development, allow all localhost origins for flexibility
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const allowedOrigins = isProduction
    ? [frontendUrl] // In production, only allow specific origin
    : [
        'http://localhost:5173', // Vite default
        'http://localhost:5174', // Vite alternate
        'http://localhost:3000', // API itself
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174',
        frontendUrl, // From env variable
      ];
  
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, Postman, etc.) in development
      if (!origin && !isProduction) {
        return callback(null, true);
      }
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
  });
  
  // Global validation pipe with optimizations
  // Uses custom pipe that skips GraphQL routes (GraphQL has its own validation)
  app.useGlobalPipes(
    new GraphQLValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      disableErrorMessages: isProduction, // Hide error details in production
      stopAtFirstError: true, // Stop validation on first error
    }),
  );
  
  // Global prefix (optional)
  // app.setGlobalPrefix('api');
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  if (!isProduction) {
    logger.log(`🚀 LogicNomad API is running on: http://localhost:${port}`);
    logger.log(`📚 GraphQL Playground: http://localhost:${port}/graphql`);
  } else {
    logger.log(`🚀 LogicNomad API is running on port ${port}`);
  }
}
bootstrap();
