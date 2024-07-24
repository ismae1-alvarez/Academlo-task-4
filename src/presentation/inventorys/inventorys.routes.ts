import { Router } from "express";
import { InventorysController } from "./inventorys.controller";
import { InventorysSevice } from "../services/inventory.service";
import { ItemService } from "../services/item.service";
import { ResourceService } from "../services/resource.service";
import { PlayersServices } from "../services/player.service";
import { UserServices } from "../services/user.service";


export class InventorysRoutes{
    static get routes ():Router{
        const router =  Router();

        const user = new UserServices()
        const player = new PlayersServices(user);



        const item =  new ItemService();
        const resource =  new ResourceService();


        const service =  new InventorysSevice(item, resource, player);
        const controller = new InventorysController(service);
        
        router.post("/players/:id/inventory/items/", controller.createInventory);
        router.post("/players/:id/inventory/resources/", controller.createResources);

        router.get("/players/:id/inventory", controller.getInventary)


        return router;
    };
};