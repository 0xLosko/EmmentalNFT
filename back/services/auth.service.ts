import {ISession, IUser, ModelRegistry} from "../models";
import {Model} from "mongoose";
import {ServiceResult} from "./service.result";
import {SecurityUtils} from "../utils";

export class AuthService {

    private userModel: Model<IUser>;
    private sessionModel: Model<ISession>;

    constructor(private modelRegistry: ModelRegistry) {
        this.userModel = modelRegistry.userModel;
        this.sessionModel = modelRegistry.sessionModel;
    }

    async subscribe(login: string, password: string): Promise<ServiceResult<IUser>> {
        try {
            const user = await this.userModel.create({
                login: login,
                password: SecurityUtils.toSHA256(password),
                accesses: []
            });
            return ServiceResult.success(user);
        } catch(err) {
            const errDict = err as {[key: string]: unknown};
            if(errDict['name'] === 'MongoServerError' && errDict['code'] === 11000) {
                // duplicate login
                return ServiceResult.conflict();
            } else {
                return ServiceResult.failed();
            }
        }
    }

    async log(login: string, password: string): Promise<ServiceResult<ISession>> {
        try {
            const user = await this.userModel.findOne({
                login: login,
                password: SecurityUtils.toSHA256(password)
            }).exec();
            if(user !== null) {
                let dateMillis = new Date().getTime();
                dateMillis += 600_000_000;
                const session = await this.sessionModel.create({
                    token: SecurityUtils.randomToken(),
                    expirationDate: dateMillis,
                    user: user
                });
                return ServiceResult.success(session);
            }
            return ServiceResult.notFound();
        } catch(err) {
            return ServiceResult.failed();
        }
    }

    async getSession(token: string): Promise<ServiceResult<ISession>> {
        try {
            const session = await this.sessionModel.findOne({
                token: token,
                expirationDate: {
                    $gt: new Date()
                }
            }).populate('user').exec();
            if(session !== null) {
                return ServiceResult.success(session);
            }
            return ServiceResult.notFound();
        } catch(err) {
            return ServiceResult.failed();
        }
    }
}