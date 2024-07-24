import { Inventory, Item, Player, Resource } from "../../data";
import { Inventory_item } from "../../data/postgres/models/inventoryItem.model";
import { Inventory_resource } from "../../data/postgres/models/inventoryResource.model";
import { CustomError } from "../../domain";
import { AddResource } from "../../domain/dtos/inventory/inventori.create.resource";
import { AddItem } from "../../domain/dtos/inventory/inventory.create.dto";
import { ItemService } from "./item.service";
import { PlayersServices } from "./player.service";
import { ResourceService } from "./resource.service";

export class InventorysSevice{

    constructor(
        private readonly itemService: ItemService,
        private readonly resourceService: ResourceService, 
        private readonly playersServices : PlayersServices
    ){};

    async createInventory(id: number, inventoryData: AddItem) {

        await this.playersServices.findOneById(id);
        
        const player = await this.getInventori(id);

        let item = await Item.findOne({
            where: {
                name: inventoryData.name,
            },
        });

        if (!item) {
            item = new Item();
            item.name = inventoryData.name;
            item.description = inventoryData.description;
            await item.save();
        };

        let inventoryItem = await Inventory_item.findOne({
            where: {
                inventory: player.inventory,
                item: item,
            },
        });

        if (inventoryItem) {
            inventoryItem.quantity += 1;
        } else {
            inventoryItem = new Inventory_item();
            inventoryItem.inventory = player.inventory;
            inventoryItem.item = item;
            inventoryItem.quantity = 1;
        };

        await inventoryItem.save();

        return player.inventory;
    };


    async createInventoriResource(resourceData:AddResource, id:number) {
        await this.playersServices.findOneById(id);
        const player = await this.getInventoriResource(id);

        

        let resource = await Resource.findOne({
            where: {
                name: resourceData.name,
            },
        });

        if (!resource) {
            resource = new Resource();
            resource.name = resourceData.name;
            resource.description = resourceData.description;
            await resource.save();
        };

        let inventoryResource = await Inventory_resource.findOne({
            where: {
                inventory: player.inventory,
                resource: resource,
            },
        });

        if (inventoryResource) {
            inventoryResource.quantity += 1;
        } else {
            inventoryResource = new Inventory_resource();
            inventoryResource.inventory = player.inventory;
            inventoryResource.resource = resource;
            inventoryResource.quantity = 1;
        };

        await inventoryResource.save();

        return player.inventory;




    };
    
    async getInventori(id:number){
        const player = await Player.findOne({
            where: {
              id
            },
            relations: {
              inventory: {
                inventory_resource:{resource : true},
                inventory_item : {item : true},
              }
            },
          });      
          if (!player) throw CustomError.notFound("Player not found");
    
          return player;
    };


    async getInventoriResource(id:number){
        const player = await Player.findOne({
            where: {
              id
            },
            relations: {
              inventory: {
                inventory_resource: {resource : true},
                inventory_item : {item : true},
              }
            },
          });      
          if (!player) throw CustomError.notFound("Player not found");
    
          return player;
    };

};