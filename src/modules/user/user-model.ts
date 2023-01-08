import { schemaComposer } from 'graphql-compose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { Document, model, Schema } from 'mongoose';

export interface UserModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const userSchema = new Schema<UserModel>(
    {
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'user',
    },
);

userSchema.index({ firstName: 1 });
userSchema.index({ lastName: 1 });
userSchema.index({ email: 1 });

export const userRepository = model<UserModel>('User', userSchema);

const userTc = composeMongoose(userRepository, {});

schemaComposer.Query.addFields({
    userById: userTc.mongooseResolvers.findById(),
    userList: userTc.mongooseResolvers.findMany(),
});

schemaComposer.Mutation.addFields({
    createUser: userTc.mongooseResolvers.createOne(),
    udpateUserById: userTc.mongooseResolvers.updateById(),
});

export const userModelGraphQLSchema = schemaComposer.buildSchema();
