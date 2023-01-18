import * as bcrypt from 'bcrypt';
import { arg, inputObjectType, mutationField, objectType } from 'nexus';
import { GraphQLError } from 'graphql';
import { genSaltSync } from 'bcrypt';
import * as yup from 'yup';
import { ObjectId } from 'mongodb';
import { userRepository } from '@modules/user/model-user';

const v1CreateUserInputType = inputObjectType({
    name: 'v1CreateUserInput',
    definition(t) {
        t.field('firstName', { type: 'String', required: true });
        t.field('lastName', { type: 'String', required: true });
        t.field('email', { type: 'String', required: true });
        t.field('password', { type: 'String', required: true });
    },
});

// This preperty will be used to generate the schema and the possible inputs on the graphql mutation
const input = {
    record: arg({ type: v1CreateUserInputType, required: true }),
};

// This property will be used to generate the output schema of the graphql mutation
const output = objectType({
    name: 'v1CreateUserOutput',
    definition(t) {
        t.field('user', {
            type: 'User',
            description: 'The updated information about the new user',
        });
    },
});

const validationSchema = yup.object().shape({
    record: yup.object().required().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().required().email(),
        password: yup.string().required(),
    }),
});

function createPassword(plainPassword: string): string {
    const saltRounds = 10; // Default cost to generate the password hash
    const salt = genSaltSync(saltRounds);
    return bcrypt.hashSync(plainPassword, salt);
}

export const field = mutationField('v1CreateUser', {
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

        const { firstName, lastName, email, password } = args.record;

        const existingUser = await userRepository.findOne({ email });

        if (existingUser) {
            throw new GraphQLError('User already exists');
        }

        const newUser = await userRepository.create({
            firstName,
            lastName,
            email,
            password: createPassword(password),
        });

        return {
            user: newUser,
        };
    },
});

export const v1CreateUser = {
    field,
    input,
    output,
};
