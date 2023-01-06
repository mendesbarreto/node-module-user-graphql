import { createServer } from 'http';
import { registerRoutes } from './routes';
import expressApp from './app';
import { config } from './config';

const httpServer = createServer(expressApp);

registerRoutes(expressApp);

httpServer.listen(config.port);

httpServer.on('listening', () => {
    console.log(`Running HTTP server at: http://localhost:${config.port}`);
    console.log(
        `Running GraphQL server at: http://localhost:${config.port}/graphql`,
    );
});
