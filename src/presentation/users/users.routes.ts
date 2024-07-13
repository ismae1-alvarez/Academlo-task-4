import { Router } from "express";
import { UserController } from "./users.controller";
import { UserServices } from "../services/user.service";

export class UserRotes{
    static get routes ():Router{
        const router =  Router();

        const services = new UserServices()
        const controller =  new UserController(services);
        


        router.get("/", controller.getAllUsers);
        router.get("/:id", controller.getUserById);
        router.post("/", controller.createUser);
        router.patch("/:id", controller.updateUserById);
        router.delete("/:id", controller.deleteUserById);



        return router;
    };
};