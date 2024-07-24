import { Router } from "express";
import { PlayersController } from "./players.controller";
import { PlayersServices } from "../services/player.service";
import { UserServices } from "../services/user.service";

export class PlayersRotes{
    static get routes ():Router{
        const router =  Router();

        const serviceUser =  new UserServices();

        const service =  new PlayersServices(serviceUser);
        const controller = new PlayersController(service);


        router.post("/players", controller.createPlayer);
        router.get("/players/:id", controller.findOneById);


        return router;
    };
};