import { expressApp } from '@src/app';
import { config } from '@src/config';

import {
    registerGraphQL,
    registerMiddlewares,
    registerRoutes,
} from '@src/routes';
import { createMongoDBInstance } from './db/mongodb';
import { createRedisInstance } from './db/redis';
import { createAppServer } from './server/http';

const httpServer = createAppServer(expressApp);
registerMiddlewares(expressApp);
registerRoutes(expressApp);
registerGraphQL(expressApp);

Promise.all([createMongoDBInstance(), createRedisInstance()])
    .then(() => {
        console.log('Start listen api');
        httpServer.listen(config.port);
    })
    .catch((e: Error) => {
        console.error(e);
    });
