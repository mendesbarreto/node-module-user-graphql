import * as yup from 'yup';
import { arg, mutationField, objectType } from 'nexus';
import { GraphQLError } from 'graphql';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from '@src/config';
import { userRepository } from './model-user';

const { jwtSecret } = config;

const input = {
    email: arg({ type: 'String', required: true }),
    password: arg({ type: 'String', required: true }),
};

const output = objectType({
    name: 'v1UserAuthOutput',
    definition(t) {
        t.field('accessToken', { type: 'String', required: true });
    },
});

const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
});

const field = mutationField('v1UserAuth', {
    complexity: 1,
    args: input,
    type: output,
    required: true,
    async resolve(_root, args) {
        try {
            await validationSchema.validate(args);
        } catch (err) {
            throw new GraphQLError(err.message);
        }

        const { email, password } = args;

        const existingUser = await userRepository.findOne({ email });

        if (!existingUser || !compareSync(password, existingUser.password)) {
            throw new GraphQLError('User or password is incorrect');
        }

        const { _id, firstName } = existingUser;

        return {
            accessToken: sign({ _id, name: firstName, email }, jwtSecret),
        };
    },
});

export const v1UserAuth = {
    field,
    input,
    output,
};
