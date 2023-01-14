import { Express } from 'express';
import { createYogaConfig } from './graphql/config-graphql';
import { healthRouter } from './modules/health/routes';
import { authenticateUser } from './modules/user/auth';

export async function registerMiddlewares(app: Express): Promise<void> {
    app.use(authenticateUser);
}

export async function registerRoutes(app: Express): Promise<void> {
    app.use('/v1/', healthRouter);
}

export async function registerGraphQL(app: Express) {
    app.use('/graphql', createYogaConfig());
}
