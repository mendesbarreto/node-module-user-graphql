import { config } from '@src/config';
import { logger } from '@src/utils/logger';
import mongoose, { Mongoose } from 'mongoose';

interface MongoDB {
    connection: mongoose.Connection;
    instance: Mongoose;
}

let mongodbConnection: mongoose.Connection;
let mongodbInstance: Mongoose;

export async function createMongoDBInstance(): Promise<void> {
    if (mongodbInstance) {
        return;
    }

    mongoose.set('debug', config.isDevelopment);
    mongoose.set('strictQuery', false);
    mongodbInstance = await mongoose.connect(config.mongodb.uri);
    mongodbConnection = mongodbInstance.connection;

    mongoose.syncIndexes().then(() => {
        logger.info('All mongo db indexes are synced');
    });

    mongodbConnection.on('error', (err) => {
        logger.error(err);
    });
    mongodbConnection.on('open', () => {
        logger.info('Connection open');
    });
}

export async function closeMongoDBConnection() {
    return mongodbConnection?.close();
}

export const mongodb: MongoDB = {
    instance: mongodbInstance,
    connection: mongodbConnection,
};
