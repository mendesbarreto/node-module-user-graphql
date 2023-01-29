const nodeEnv = process.env.NODE_ENV ?? 'development';
const isDeveloment = !process.env.NODE_ENV || nodeEnv === 'development';
const isProduction = nodeEnv === 'production';

type ServerEnv = 'local' | 'development' | 'production';
const serverEnv: ServerEnv =
    (process.env.SERVER_ENV as ServerEnv) || 'development';

function getNatsServers(): string[] {
    const natServers = process.env.NATS_SERVERS ?? 'nats://0.0.0.0:4222';
    return natServers.split(',');
}

const development = {
    name: 'module-user',
    nodeEnv,
    serverEnv,
    isDevelopment: isDeveloment,
    isProduction,
    routesPrefix: process.env.ROUTES_PREFIX ?? '/api/module-user/',
    port: process.env.PORT ?? 4000,
    mongodb: {
        uri:
            process.env.MONGODB_URI ??
            'mongodb://0.0.0.0:27017/module-user-local',
    },
    redis: {
        uri: process.env.REDIS_URI ?? 'redis://0.0.0.0:6379',
        prefix: process.env.REDIS_PREFIX ?? 'user',
        timeout: parseInt(process.env.REDIS_TIMEOUT ?? '10000', 32),
        maxRetires: parseInt(process.env.REDIS_MAX_RETRIES ?? '10', 32),
        userCacheTime: parseInt(
            process.env.REDIS_USER_CACHE_TIME ?? '4000',
            32,
        ),
    },
    nats: {
        servers: getNatsServers(),
        reconnectTimeWait: 10000,
        maxReconnectAttempts: 15,
        reconnect: true,
        user: process.env.NATS_USER,
        pass: process.env.NATS_PASSWORD,
    },
    jwtSecret: process.env.JWT_SECRET ?? 'TOP_SECRET',
    httpTimeout: 10000,
};

export { development as config };
