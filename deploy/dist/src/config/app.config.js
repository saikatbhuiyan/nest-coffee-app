"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    app_port: parseInt(process.env.APP_PORT, 10) || 3000,
    environment: process.env.NODE_ENV || 'development',
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        tokenAudience: process.env.JWT_TOKEN_AUDIENCE,
        tokenIssuer: process.env.JWT_TOKEN_ISSUER,
        accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
        refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? '86400', 10),
    },
});
//# sourceMappingURL=app.config.js.map