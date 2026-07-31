declare const _default: () => {
    app_port: number;
    environment: string;
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
    };
    jwt: {
        secret: string;
        tokenAudience: string;
        tokenIssuer: string;
        accessTokenTtl: number;
        refreshTokenTtl: number;
    };
};
export default _default;
