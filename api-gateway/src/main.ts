import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

import helmet from 'helmet';
import * as cors from 'cors';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Sécurité de base :
  // 1. Protection des headers HTTP
  app.use(helmet());

  // 2. Activation du CORS (Cross-Origin Resource Sharing)
  app.use(cors({
    origin: '*', // À restreindre en prod (ex : ["https://tondomaine.com"])
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // 3. Limitation du nombre de requêtes (rate limiting)
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limite chaque IP à 100 requêtes par fenêtre
      message: 'Trop de requêtes depuis cette IP, réessayez plus tard.'
    })
  );

  // Ajout du proxy pour /api/*
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.BACKEND_URL || 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );

  app.use(
    '/auth',
    createProxyMiddleware({
      target: process.env.AUTHENTICATION_BACKEND_URL || 'http://localhost:3002',
      changeOrigin: true,
      pathRewrite: { '^/auth': '' },
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
