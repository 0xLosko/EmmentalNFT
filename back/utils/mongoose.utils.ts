import * as mongoose from "mongoose";
import {Mongoose} from "mongoose";

export class MongooseUtils {

    static open(): Promise<Mongoose> {
        return mongoose.connect(process.env.MONGODB_URI as string, {
            auth: {
                username: process.env.MONGODB_USER,
                password: process.env.MONGODB_PASSWORD
            },
            authSource: 'admin'
        });
    }
}