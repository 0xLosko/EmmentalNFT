import {Schema} from "mongoose";

export interface IUser {
    login: string;
    password: string;
    accesses: string[];
}

export const userSchema = new Schema<IUser>({
   login: {
       type: Schema.Types.String,
       index: true, // si recherche a faire il faut mettre un index
       required: true,
       unique: true
   },
   password: {
       type: Schema.Types.String,
       required: true
   },
   accesses: {
       type: [Schema.Types.String],
       required: true
   }
}, {
    versionKey: false // permet d'enlever le __v des documents
});