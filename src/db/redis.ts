import { config } from '@src/config';
import Redis from 'ioredis';

let redisInstance: Redis;
const options = { ...config.redis, isDevelopment: config.isDevelopment };

async function createRedisInstance(): Promise<void> {
    const { uri, ...opt } = options;
    redisInstance = new Redis(uri, opt);
    console.log('Redis initialized');
}

async function disconectRedis() {
    return redisInstance?.disconnect();
}

async function redisGet<T = string>(key: string): Promise<T> {
    const value = await redisInstance.get(key);

    try {
        return JSON.parse(value);
    } catch (error) {
        return value as unknown as T;
    }
}

async function redisSet(
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    cacheTimeSeconds = 5,
): Promise<'OK'> {
    if (typeof value === 'object') {
        return redisInstance.set(key, JSON.stringify(value));
    }

    return redisInstance.set(key, value, 'EX', cacheTimeSeconds);
}

export {
    redisInstance,
    createRedisInstance,
    disconectRedis,
    redisGet,
    redisSet,
};
