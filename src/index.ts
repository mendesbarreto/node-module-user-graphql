import { expressApp } from '@src/app';
import { config } from '@src/config';

import { registerGraphQL, registerRoutes } from '@src/routes';
import { createMongoDBInstance } from './db/mongodb';
import { createAppServer } from './server/http';

const httpServer = createAppServer(expressApp);
registerRoutes(expressApp);
registerGraphQL(expressApp);

Promise.all([createMongoDBInstance()])
    .then(() => {
        console.log('Start listen api');
        httpServer.listen(config.port);
    })
    .catch((e: Error) => {
        console.error(e);
    });
