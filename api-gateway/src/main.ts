import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ajout du proxy pour /api/*
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.BACKEND_URL || 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
      onProxyReq: (proxyReq, req: Request, res: Response) => {
        // Optionnel : logs ou custom headers
      },
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
