import { Express } from 'express';
import { makeSchema } from 'nexus';
import path, { join } from 'path';
import { config } from './config';
import { healthRouter } from './modules/heath/routes';

export const mergedAppSchemas = [];

export async function registerRoutes(app: Express) {
    app.use('/v1/', healthRouter);
}

export async function registerGraphQL(app: Express) {
    const schema = makeSchema({
        types: mergedAppSchemas,
        outputs: {
            schema: path.join(__dirname, '/../../.graphql-spec/schema.graphql'),
            typegen: path.join(__dirname, '/graphql-schema.ts')
        },
        mapping: {
            MongoID: 'ObjectId | string',
            DateTime: 'Date | string',
            Date: 'Date | string',
            Time: 'Date | string',
            BigInt: 'number',
            UUID: 'string',
            Upload: 'FileUpload'
        },
        shouldExitAfterGenerateArtifacts: process.env.includes('--nexus-exit'),
        shouldGenerateArtifacts: !config.isProduction,
        contextType: !config.isProduction ? {
            module: path.join(__dirname, '.graphql-context.ts'),
            export: 'IGraphQLContext'
        }
    });
}
