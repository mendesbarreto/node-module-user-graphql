import { Router } from 'express';

export const healthRouter = Router();

healthRouter.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

healthRouter.get('/heath', (req, res) => {
    res.status(200).send('Ok');
});
