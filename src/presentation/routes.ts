import { Router } from "express";
import { UserRotes } from "./users/users.routes";
import { PlayersRotes } from "./players/players.routes";

export class AppRoutes {
    static get routes():Router{
        const routes = Router();

         


        routes.use("/api/v1/", UserRotes.routes);
        routes.use("/api/v1/", PlayersRotes.routes);




        return routes;
    }
}