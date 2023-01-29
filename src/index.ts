import { expressApp } from '@src/app';
import { config } from '@src/config';

import {
    registerGraphQL,
    registerMiddlewares,
    registerRoutes,
} from '@src/routes';
import { createMongoDBInstance } from './db/mongodb';
import { createRedisInstance } from './db/redis';
import { createNats, jetStreamClient } from './nats/nats-server';
import { createAppServer } from './server/http';
import { logger } from './utils/logger';

const httpServer = createAppServer(expressApp);
registerMiddlewares(expressApp);
registerRoutes(expressApp);
registerGraphQL(expressApp);

Promise.all([createMongoDBInstance(), createRedisInstance(), createNats()])
    .then(() => {
        logger.info('Start listen api');
        httpServer.listen(config.port);

        const message = 'Module user up and running!';


        logger.info(message);
        // TODO: Test nast message here 
        //return jetStreamClient.publish(config.name, Buffer.from(message));
    })
    .catch((e: Error) => {
        logger.error(e);
    });
