import { Document } from 'mongoose';

export interface UserModel extends Document {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
}
