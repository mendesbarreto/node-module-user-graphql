import { createServer } from 'http';
import { expressApp } from '@src/app';
import { config } from '@src/config';

import { registerRoutes } from '@src/routes';

const httpServer = createServer(expressApp);

registerRoutes(expressApp);

httpServer.listen(config.port);

httpServer.on('listening', () => {
    console.log(`Running HTTP server at: http://localhost:${config.port}`);
    console.log(
        `Running GraphQL server at: http://localhost:${config.port}/graphql`,
    );
});
