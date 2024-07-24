import { Router } from "express";
import { UserRotes } from "./users/users.routes";
import { PlayersRotes } from "./players/players.routes";
import { AuthMiddleware } from "../middleware";
import { InventorysRoutes } from "./inventorys/inventorys.routes";

export class AppRoutes {
    static get routes():Router{
        const routes = Router();

         


        routes.use("/api/v1/", UserRotes.routes);



        routes.use(AuthMiddleware.protect);
        routes.use("/api/v1/", PlayersRotes.routes);
        routes.use("/api/v1/", InventorysRoutes.routes);




        return routes;
    }
}