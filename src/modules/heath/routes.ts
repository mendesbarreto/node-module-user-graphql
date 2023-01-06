import { Router } from 'express';

export const healthRouter = Router();

healthRouter.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

healthRouter.get('/health', (req, res) => {
    res.status(200).send('Ok');
});
