import { RequestHandler } from 'express';
import { mergeSchemas } from '@graphql-tools/schema';
import {
    connectionPlugin,
    declarativeWrappingPlugin,
    fieldAuthorizePlugin,
    makeSchema,
    queryComplexityPlugin,
} from 'nexus';
import path from 'path';
import { config } from '@src/config';
import { createYoga } from 'graphql-yoga';
import { userModelGraphQLSchema } from '@src/modules/user/user-model';
import { v1CreateUser } from '@src/modules/user/v1-create-user';
import { v1UserAuth } from '@src/modules/user/v1-user-auth';
import { v1UserList } from '@src/modules/user/v1-user-list';
import { IGraphQLContext } from './graphql-context';

export const mergedAppSchemas = [
    mergeSchemas({
        schemas: [userModelGraphQLSchema],
    }),
    v1CreateUser,
    v1UserAuth,
    v1UserList,
];

export function createNexusConfig() {
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
                  module: path.join(__dirname, '/graphql-context.ts'),
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
            queryComplexityPlugin(),
        ],
    });
}

export function createYogaConfig() {
    const nexusSchema = createNexusConfig();

    const yoga = createYoga<IGraphQLContext>({
        schema: nexusSchema,
        context: async function context(opt) {
            return {
                ...opt,
                req: opt.req,
                resp: opt.resp,
                startAt: Date.now(),
            };
        },
        graphiql: config.serverEnv !== 'production',
        maskedErrors: config.serverEnv === 'production',
        multipart: true,
        parserCache: true,
        validationCache: true,
        batching: { limit: 5 },
    }) as RequestHandler;

    return yoga;
}
