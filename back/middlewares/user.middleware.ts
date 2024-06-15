import {NextFunction, RequestHandler, Request, Response} from "express";

export class UserMiddleware {

    static isAdmin(): RequestHandler {
        return function(req: Request, res: Response, next: NextFunction) {
            const user = req.user;
            if(!user) {
                res.status(401).end();
                return;
            }
            if(typeof user === 'string') {
                res.status(403).end();
                return;
            }
            const indexOf = user.accesses.indexOf('admin');
            if(indexOf === -1) {
                res.status(403).end();
                return;
            }
            next(); // is admin user
        }
    }
}