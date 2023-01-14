import { GraphQLError } from 'graphql';
import { list, objectType, queryField } from 'nexus';
import { userRepository } from './user-model';

const input = {};

const output = objectType({
    name: 'v1UserListOutput',
    definition(t) {
        t.field('users', { type: list('User') });
    },
});

const field = queryField('v1UserList', {
    complexity: 1,
    args: input,
    type: output,
    required: true,
    async resolve(_root, _args, ctx) {
        if (!ctx.req.user) {
            throw new GraphQLError('Not authorized');
        }

        // TODO: Add pagination to user list resolver

        const users = await userRepository.find();

        return {
            users,
        };
    },
});

export const v1UserList = {
    field,
    input,
    output,
};
