import { Player, Resource } from "../../data";
import { CustomError } from "../../domain";
import { AddResource } from "../../domain/dtos/inventory/inventori.create.resource";

enum Role {
    PLAYER = "PLAYER",
    ADMIN  = "ADMIN"
  };
export class ResourceService{
    // Chacar este Rollo
    async findOneResourceById(id:number){
        const resource = await Player.findOne({
            where : {id}
        });

        if (!resource) throw CustomError.notFound("Resource not found")

        return resource;
    };


    async createResource(dataResource:AddResource, id:number) {
    
        await this.findOneResourceById(id);

        const existingResource = await Resource.findOne({
            where :{ name :  dataResource.name}
        });
        
        if (existingResource)  throw CustomError.badRequest("El recurso ya existe");

        const newResource = new Resource();
        newResource.name = dataResource.name;
        newResource.description = dataResource.description;

        await newResource.save();

        return newResource;
    };

    async getAllRecource(){
        const player = await Player.findOne({
            where: {
                role :Role.ADMIN
            },
            relations: {
              inventory: {
                inventory_resource: {resource : true},
              }
            },
          });      
          if (!player) throw CustomError.notFound("Player not found");
    
          return player;
    };


};