import { Router } from "express";
import { UserRotes } from "./users/users.routes";

export class AppRoutes {
    static get routes():Router{
        const routes = Router();

         


        routes.use("/api/v1/", UserRotes.routes);




        return routes;
    }
}