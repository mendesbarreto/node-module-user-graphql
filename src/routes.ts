import { Express } from 'express';
import { healthRouter } from './modules/heath/routes';

export async function registerRoutes(app: Express) {
    app.use('/v1/', healthRouter);
}
