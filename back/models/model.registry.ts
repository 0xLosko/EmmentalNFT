import {Model, Mongoose} from "mongoose";
import {IUser, userSchema} from "./user.model";
import {ISession, sessionSchema} from "./session.model";

export class ModelRegistry {
    readonly mongoose: Mongoose;
    readonly userModel: Model<IUser>;
    readonly sessionModel: Model<ISession>;

    constructor(mongoose: Mongoose) {
        this.mongoose = mongoose;
        this.userModel = mongoose.model('User', userSchema);
        this.sessionModel = mongoose.model('Session', sessionSchema);
    }
}
