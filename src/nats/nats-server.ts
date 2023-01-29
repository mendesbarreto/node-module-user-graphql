import { config } from '@src/config';
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
        console.error('No Nats servers found');
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
        console.info("Nats connected");
    } catch (err) {
        console.error(err);
        throw err;
    }

    try {
        jetStreamManager = await connection.jetstreamManager();
        console.info('JetStream Manager connected');
    } catch (err) {
        console.error(err);
    }

    try {
        // The stream will be anythng that arrives with the appanme
        const stream = await jetStreamManager.streams.add({ name, subjects: [`${name}.*`] });
        console.info(`The api stream created ${stream.config} `);
    } catch (err) {
        console.error(err);
    }

    try {
        jetStreamClient = connection.jetstream();
        console.info('JetStream client created');
    } catch (err) {
        console.error(err);
    }
}

export async function disconnectNats() {
    if (!connection) {
        console.warn('No nats connection created or active to disconnect');
    }
    return connection?.close();
}

export { connection, jetStreamClient, jetStreamManager };
