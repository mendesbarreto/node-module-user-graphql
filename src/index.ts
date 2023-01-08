import { createServer } from 'http';
import { expressApp } from '@src/app';
import { config } from '@src/config';

import { registerGraphQL, registerRoutes } from '@src/routes';
import { createMongoDBInstance } from './db/mongodb';

const httpServer = createServer(expressApp);

registerRoutes(expressApp);
registerGraphQL(expressApp);

httpServer.on('listening', () => {
    console.log(`Running HTTP server at: http://localhost:${config.port}`);
    console.log(
        `Running GraphQL server at: http://localhost:${config.port}/graphql`,
    );
});

Promise.all([createMongoDBInstance()])
    .then(() => {
        console.log('Start listen api');
        httpServer.listen(config.port);
    })
    .catch((e: Error) => {
        console.error(e);
    });
