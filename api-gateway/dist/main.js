"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const helmet_1 = require("helmet");
const cors = require("cors");
const express_rate_limit_1 = require("express-rate-limit");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: 'Trop de requêtes depuis cette IP, réessayez plus tard.'
    }));
    app.use('/api', (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: process.env.BACKEND_URL || 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
    }));
    app.use('/auth', (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: process.env.AUTHENTICATION_BACKEND_URL || 'http://localhost:3002',
        changeOrigin: true,
        pathRewrite: { '^/auth': '' },
    }));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map