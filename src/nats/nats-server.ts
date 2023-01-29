import { config } from '@src/config';
import { logger } from '@src/utils/logger';
import { connect, JetStreamClient, JetStreamManager, NatsConnection } from 'nats';

let connection: NatsConnection;
let jetStreamManager: JetStreamManager;
let jetStreamClient: JetStreamClient;

export async function createNats() {
    const { name } = config;
    const {
        servers,
        reconnect,
        reconnectTimeWait,
        maxReconnectAttempts,
        user,
        pass,
    } = config.nats;

    if (!servers) {
        logger.error('No Nats servers found');
        return;
    }

    try {
        connection = await connect({
            servers,
            name,
            reconnect,
            reconnectTimeWait,
            maxReconnectAttempts,
            user,
            pass,
        });
        // TODO: Add success logs here
        logger.info("Nats connected");
    } catch (err) {
        logger.error(err);
        throw err;
    }

    try {
        jetStreamManager = await connection.jetstreamManager();
        logger.info('JetStream Manager connected');
    } catch (err) {
        logger.error(err);
    }

    try {
        // The stream will be anythng that arrives with the appanme
        const stream = await jetStreamManager.streams.add({ name, subjects: [`${name}.*`] });
        logger.info(`The api stream created ${stream.config} `);
    } catch (err) {
        logger.error(err);
    }

    try {
        jetStreamClient = connection.jetstream();
        logger.info('JetStream client created');
    } catch (err) {
        logger.error(err);
    }
}

export async function disconnectNats() {
    if (!connection) {
        logger.warn('No nats connection created or active to disconnect');
    }
    return connection?.close();
}

export { connection, jetStreamClient, jetStreamManager };
