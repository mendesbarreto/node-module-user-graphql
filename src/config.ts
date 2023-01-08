const nodeEnv = process.env.NODE_ENV ?? 'development';
const isDeveloment = !process.env.NODE_ENV || nodeEnv === 'development';
const isProduction = nodeEnv === 'production';

type ServerEnv = 'local' | 'development' | 'production';
const serverEnv: ServerEnv =
    (process.env.SERVER_ENV as ServerEnv) || 'development';

const development = {
    nodeEnv,
    serverEnv,
    isDeveloment,
    isProduction,
    routesPrefix: process.env.ROUTES_PREFIX ?? '/api/module-user/',
    port: process.env.PORT ?? 4000,
    mongodb: {
        uri:
            process.env.MONGODB_URI ??
            'mongodb://0.0.0.0:27017/module-user-local',
    },
    jwtSecrete: process.env.JWT_SECRET ?? 'topSecreteKey',
    httpTimeout: 10000,
};

export { development as config };
