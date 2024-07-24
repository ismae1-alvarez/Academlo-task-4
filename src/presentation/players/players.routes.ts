import { Router } from "express";
import { PlayersController } from "./players.controller";
import { AuthMiddleware } from "../../middleware";

export class PlayersRotes{
    static get routes ():Router{
        const router =  Router();

       
        const controller = new PlayersController();


        router.use(AuthMiddleware.protect);
        router.post("/players", controller.createPlayer);


        return router;
    };
};