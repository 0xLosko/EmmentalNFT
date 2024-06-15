import {NextFunction, RequestHandler, Request, Response} from "express";
import {AuthService} from "../services";
import {ServiceErrorCode} from "../services/service.result";

export class SessionMiddleware {

    static isLogged(authService: AuthService): RequestHandler {
        return async function(req: Request, res: Response, next: NextFunction) {
            const authorization = req.headers['authorization'];
            if(authorization === undefined) {
                res.status(401).end(); // UNAUTHORIZED
                return;
            }
            const authParts = authorization.split(' ');
            if(authParts.length !== 2 || authParts[0] !== 'Bearer') {
                res.status(401).end(); // UNAUTHORIZED
                return;
            }
            const token = authParts[1];
            const sr= await authService.getSession(token);
            switch (sr.errorCode) {
                case ServiceErrorCode.success:
                    req.user = sr.result?.user;
                    next();
                    break;
                default:
                    res.status(401).end(); // UNAUTHORIZED
                    break;
            }
        }
    }
}