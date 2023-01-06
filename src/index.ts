import { createServer } from 'http';
import { registerRoutes } from './routes';
import expressApp from './app';

const httpServer = createServer(expressApp);

registerRoutes(expressApp);

httpServer.listen(4000);
httpServer.on('listening', () => console.log('Hi there'));
