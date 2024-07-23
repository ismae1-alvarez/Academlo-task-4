import { Router } from "express";
import { UserController } from "./users.controller";
import { UserServices } from "../services/user.service";

export class UserRotes{
    static get routes ():Router{
        const router =  Router();

        const services = new UserServices()
        const controller =  new UserController(services);
        


        router.post("/register", controller.createUser);
        router.post("/login", controller.login);


        return router;
    };
};