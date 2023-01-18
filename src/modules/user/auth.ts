import { config } from '@src/config';
import { redisGet, redisInstance, redisSet } from '@src/db/redis';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { UserLean, userRepository } from './model-user';

const { jwtSecret } = config;
const jwtUidPrefixKey = 'jwtUid:';
const userUidPrefixKey = 'uid:';

export async function authenticateUser(
    request: Request,
    _response: Response,
    next: NextFunction,
): Promise<void> {
    const { authorization } = request.headers;

    if (!authorization) {
        next();
        return;
    }

    const token = authorization.split(' ')[1];

    const jwtUidKey = `${jwtUidPrefixKey}${token}`;
    const jwtUid = await redisGet(jwtUidKey);
    const userUid = `${userUidPrefixKey}${jwtUid}`;
    let cachedUser: { user: UserLean } = await redisGet(userUid);
    let user: UserLean;

    if (!cachedUser) {
        console.log('User not cached');
        const { _id: userId } = verify(token, jwtSecret) as JwtPayload;

        user = await userRepository
            .findOne({ _id: new Types.ObjectId(userId) })
            .lean();

        await redisSet(userUid, { user }, config.redis.userCacheTime);
        // eslint-disable-next-line no-underscore-dangle
        await redisSet(jwtUidKey, user._id, config.redis.userCacheTime);
    } else {
        user = cachedUser.user;
    }

    request.user = user;

    next();
}
