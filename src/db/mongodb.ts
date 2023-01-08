import { config } from '@src/config';
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

    mongoose.set('debug', config.isDeveloment);
    mongoose.set('strictQuery', false);
    mongodbInstance = await mongoose.connect(config.mongodb.uri);
    mongodbConnection = mongodbInstance.connection;

    mongoose.syncIndexes().then(() => {
        console.log('All mongo db indexes are synced');
    });

    mongodbConnection.on('error', (err) => {
        console.error(err);
    });
    mongodbConnection.on('open', () => {
        console.info('Connection open');
    });
}

export async function closeMongoDBConnection() {
    return mongodbConnection?.close();
}

export const mongodb: MongoDB = {
    instance: mongodbInstance,
    connection: mongodbConnection,
};
