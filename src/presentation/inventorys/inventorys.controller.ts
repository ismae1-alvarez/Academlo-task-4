import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { AddItem } from "../../domain/dtos/inventory/inventory.create.dto";
import { InventorysSevice } from "../services/inventory.service";
import { AddResource } from "../../domain/dtos/inventory/inventori.create.resource";

export class InventorysController{
    constructor(public readonly serviceInventory:InventorysSevice){};


    private getErrorMessage =(error:unknown, res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:  error.message});
        };
        return res.status(500).json({message: 'Something went very wrong! 🧨'});
    };

    createInventory=(req:Request, res:Response)=>{
        const {id} =  req.params;
        
        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});
        
        const [error, inventoryDto] = AddItem.create(req.body);

        if(error) return res.status(422).json(error);

        this.serviceInventory.createInventory(+id, inventoryDto!)
            .then(inventory => res.status(202).json(inventory))
            .catch(error => this.getErrorMessage(error, res));
    };

    createResources =(req:Request, res:Response)=>{
        const {id} =  req.params;
        
        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        const [error, inventoryItem] = AddResource.create(req.body);

        if(error) return res.status(422).json(error);

        this.serviceInventory.createInventoriResource(inventoryItem!, +id)
            .then(inventory => res.status(202).json(inventory))
            .catch(error => this.getErrorMessage(error, res));
    };

    getInventary=(req:Request, res:Response)=>{
        const {id} =  req.params;

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        this.serviceInventory.getInventori(+id)
            .then(inventory => res.status(202).json(inventory))
            .catch(error => this.getErrorMessage(error, res));
    };


    

};