import {Schema} from "mongoose";
import {IUser} from "./user.model";

export interface ISession {
    user: string | IUser;
    expirationDate: Date;
    token: string;
}

export const sessionSchema = new Schema<ISession>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expirationDate: {
        type: Schema.Types.Date,
        required: true
    },
    token: {
        type: Schema.Types.String,
        required: true,
        unique: true
    }
}, {
    versionKey: false // permet d'enlever le __v des documents
});