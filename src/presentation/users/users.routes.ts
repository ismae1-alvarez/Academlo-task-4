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
        
        // Tratar de proteger esto si hay tiempo
        router.get("/users", controller.getAllUser);
        router.get("/users/:id", controller.getAllUseById);

        return router;
    };
};