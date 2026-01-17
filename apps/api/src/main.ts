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
  }));
  
  // Compression middleware
  app.use(compression());
  
  // Enable CORS for frontend communication
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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
