import { config } from '@src/config';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { userRepository } from './user-model';

const { jwtSecret } = config;

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

    const { _id: userId } = verify(token, jwtSecret) as JwtPayload;

    const user = await userRepository
        .findOne({ _id: new Types.ObjectId(userId) })
        .lean();

    request.user = user;

    next();
}
