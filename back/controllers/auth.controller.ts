import express from "express";
import {Router, Request, Response} from "express";
import {AuthService} from "../services";
import {ServiceErrorCode} from "../services/service.result";
import {SessionMiddleware} from "../middlewares/session.middleware";

export class AuthController {

    // Le fait de déclarer dans le constructeur une variable avec une
    // visibilité alors il créer et affecte automatiquement la variable
    // a l'instance
    constructor(private authService: AuthService) {
    }

    async subscribe(req: Request, res: Response) {
        const sr= await this.authService.subscribe(req.body.login, req.body.password);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            case ServiceErrorCode.conflict:
                res.status(409).end();
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async login(req: Request, res: Response) {
        const sr= await this.authService.log(req.body.login, req.body.password);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            case ServiceErrorCode.notFound:
                res.status(404).end();
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async me(req: Request, res: Response) {
        const u = req.user;
        res.json(u);
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.post('/subscribe', express.json(), this.subscribe.bind(this));
        router.post('/login', express.json(), this.login.bind(this));
        router.get('/me', SessionMiddleware.isLogged(this.authService), this.me.bind(this));
        return router;
    }
}