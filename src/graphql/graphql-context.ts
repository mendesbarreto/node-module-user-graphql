import { Request, Response } from 'express';

export interface IGraphQLContext {
    req: Request;
    resp: Response;
    startAt: number;
}
