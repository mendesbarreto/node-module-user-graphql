import { Express } from 'express';
import {
    connectionPlugin,
    declarativeWrappingPlugin,
    fieldAuthorizePlugin,
    makeSchema,
} from 'nexus';
import path, { join } from 'path';
import { config } from './config';
import { healthRouter } from './modules/heath/routes';

export const mergedAppSchemas = [];

export async function registerRoutes(app: Express) {
    app.use('/v1/', healthRouter);
}

export async function createNexusSchema() {
    return makeSchema({
        types: mergedAppSchemas,
        outputs: {
            schema: path.join(__dirname, '/../../.graphql-spec/schema.graphql'),
            typegen: path.join(__dirname, '/graphql-schema.ts'),
        },
        sourceTypes: {
            headers: ['import { ObjectId } from "mongodb"'],
            modules: [],
            mapping: {
                MongoID: 'ObjectId | string',
                DateTime: 'Date | string',
                Date: 'Date | string',
                Time: 'Date | string',
                BigInt: 'number',
                UUID: 'string',
                Upload: 'FileUpload',
            },
        },
        shouldExitAfterGenerateArtifacts: process.argv.includes('--nexus-exit'),
        shouldGenerateArtifacts: !config.isProduction,
        contextType: !config.isProduction
            ? {
                  module: path.join(__dirname, '.graphql-context.ts'),
                  export: 'IGraphQLContext',
              }
            : undefined,
        plugins: [
            // The declarative wrapping adds some filds to the schema defination like required, nullable e etc.
            declarativeWrappingPlugin({ disable: false }),
            // The connection plugin provides a new method callend connectionField to make assosiation between types.
            connectionPlugin(),
            // Add a new field to the schema defination called authorize and we can see if the user is allowed to view or not that field
            fieldAuthorizePlugin(),
            //
        ],
    });
}

export async function createApplicationSchemas() {}

export async function registerGraphQL(app: Express) {}
