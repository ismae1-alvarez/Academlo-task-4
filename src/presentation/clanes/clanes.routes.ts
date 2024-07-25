import { Router } from "express";
import { AuthMiddleware } from "../../middleware";
import { ClanesController } from "./clanes.controller";
import { ClanesServices } from "../services/clanes.service";



enum Role {
    PLAYER = "PLAYER",
    ADMIN  = "ADMIN"
  };


export class ClanesRoutes{
    static get routes ():Router{
        const router =  Router();

        const clanes = new ClanesServices();
        const controller =  new ClanesController(clanes);
        
        router.use(AuthMiddleware.restrictedAccess(Role.ADMIN));
        router.post("/clans/", controller.createClanes);
        router.post("/clans/:id/join/", controller.createClanMemmber);
        router.get("/clans/:id/members", controller.getClanesMember)
   


        return router;
    };
};