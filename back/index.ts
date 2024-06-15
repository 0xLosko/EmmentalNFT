import {config} from "dotenv";
config(); // chargement des vars d'env

import {MongooseUtils} from "./utils";
import {Mongoose} from "mongoose";
import express from "express";
import cors from "cors";
import {ModelRegistry} from "./models";
import {AuthController} from "./controllers";
import {AuthService} from "./services";

async function launchAPI() {
    const db: Mongoose = await MongooseUtils.open();
    const registry = new ModelRegistry(db);

    const app = express();
    app.use(cors());

    const authService = new AuthService(registry);
    const authController = new AuthController(authService);
    app.use('/auth', authController.buildRoutes());

    app.listen(process.env.PORT, function() {
        console.log(`Listening on ${process.env.PORT}`);
    });
}

launchAPI().catch(console.error);
