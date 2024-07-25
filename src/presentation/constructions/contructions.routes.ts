import { Router } from "express";
import { ContructionsController } from "./contructions.controller";
import { AuthMiddleware } from "../../middleware";
import { ContructionsServices } from "../services/constructions.service";
import { PlayersServices } from "../services/player.service";
import { UserServices } from "../services/user.service";


enum Role {
    PLAYER = "PLAYER",
    ADMIN  = "ADMIN"
  };


export class ContructionsRoutes{
    static get routes ():Router{
        const router =  Router();

        const userServices =  new UserServices()
        const playersServices = new PlayersServices(userServices)

        const services =  new ContructionsServices(playersServices);
        const controller = new ContructionsController(services);
        
        router.use(AuthMiddleware.restrictedAccess(Role.ADMIN));
        router.post("/constructions/", controller.createContruction);
        router.get("/players/:id/constructions/", controller.createContruction);


        return router;
    };
};