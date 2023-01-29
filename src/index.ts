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

const httpServer = createAppServer(expressApp);
registerMiddlewares(expressApp);
registerRoutes(expressApp);
registerGraphQL(expressApp);

Promise.all([createMongoDBInstance(), createRedisInstance(), createNats()])
    .then(() => {
        console.log('Start listen api');
        httpServer.listen(config.port);

        const message = 'Module user up and running!';
        // TODO: Test nast message here 
        //return jetStreamClient.publish(config.name, Buffer.from(message));
    })
    .catch((e: Error) => {
        console.error(e);
    });
