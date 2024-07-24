import { Router } from "express";
import { ResourcesController } from "./resources.controller";
import { AuthMiddleware } from "../../middleware";
import { ResourceService } from "../services/resource.service";

enum Role {
    PLAYER = "PLAYER",
    ADMIN  = "ADMIN"
  };

export class ResourcesRotes{
    static get routes ():Router{
        const router =  Router();



        const service =  new ResourceService();
        const controller = new ResourcesController(service);



        
        router.use(AuthMiddleware.restrictedAccess(Role.ADMIN));

        router.post('/resources/', controller.createResource);
        router.get("/resources/", controller.getAllRecource)
        

        return router;
    };
};