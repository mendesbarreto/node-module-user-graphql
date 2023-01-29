/* eslint-disable @typescript-eslint/no-unused-vars */
import { config } from '@src/config';
import { closeMongoDBConnection } from '@src/db/mongodb';
import { logger } from '@src/utils/logger';
import { Express } from 'express';
import { createServer, Server } from 'http';

// Process errors consts
const uncaughtException = 'uncaughtException';
const unhandledRejection = 'unhandledRejection';
const sigterm = 'SIGTERM';
const sigint = 'SIGINT';

function gracefulShutdown(
    httpServer: Server,
    opt: { coredump: boolean; timeout: number },
) {
    const exitFn = async (err) => {
        await closeMongoDBConnection();
        // in case of crash or memory problems exit right way
        if (opt.coredump) {
            process.abort();
        } else {
            process.exit(err);
        }
    };

    // eslint-disable-next-line no-unused-vars
    return (code, reason) => (err, promise) => {
        if (err && err instanceof Error) {
            logger.error(err.message, err.stack);
        } else {
            logger.error(`The api will close because: ${reason} with ${code}`);
        }
        // Add a Circuit Breakker
        // Try to finish the system gracefully but if something happen shutdown immediately
        httpServer.close(exitFn);
        setTimeout(exitFn, opt.timeout).unref();
    };
}

export function createAppServer(app: Express) {
    const httpServer = createServer(app);

    httpServer.on('listening', () => {
        logger.info(`Running HTTP server at: http://localhost:${config.port}`);
        logger.info(
            `Running GraphQL server at: http://localhost:${config.port}/graphql`,
        );
    });

    const exitHandler = gracefulShutdown(httpServer, {
        coredump: false,
        timeout: 10000,
    });

    process.on(uncaughtException, exitHandler(1, 'Unexpected Error Occurred'));
    process.on(unhandledRejection, exitHandler(1, 'Unhandled Promise'));
    process.on(sigint, exitHandler(0, `Your operating system: ${sigint}`));
    process.on(sigterm, exitHandler(0, `Your operating system: ${sigterm}`));

    return httpServer;
}
