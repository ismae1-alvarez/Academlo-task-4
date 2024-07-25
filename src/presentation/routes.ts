import { Router } from "express";
import { UserRotes } from "./users/users.routes";
import { PlayersRotes } from "./players/players.routes";
import { AuthMiddleware } from "../middleware";
import { InventorysRoutes } from "./inventorys/inventorys.routes";
import { ResourcesRotes } from "./resources/resource.routes";
import { ContructionsRoutes } from "./constructions/contructions.routes";

export class AppRoutes {
    static get routes():Router{
        const routes = Router();

         


        routes.use("/api/v1/", UserRotes.routes);



        routes.use(AuthMiddleware.protect);
        routes.use("/api/v1/", PlayersRotes.routes);
        routes.use("/api/v1/", InventorysRoutes.routes);
        routes.use("/api/v1/", ResourcesRotes.routes);
        routes.use("/api/v1/", ContructionsRoutes.routes);




        return routes;
    }
}