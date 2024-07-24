import { Request, Response } from "express";
import { ResourceService } from "../services/resource.service";
import { CustomError } from "../../domain";
import { AddResource } from "../../domain/dtos/inventory/inventori.create.resource";
import { send } from "process";


export class ResourcesController{
    constructor(private readonly resourceService:ResourceService){};

    private getErrorMessage =(error:unknown, res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:  error.message});
        };
        return res.status(500).json({message: 'Something went very wrong! 🧨'});
    };

    createResource = (req:Request, res:Response)=>{
        const {id} = req.body.playerUser;

        const [error, createResource] = AddResource.create(req.body);

        if(error) return res.status(422).json(error);

        this.resourceService.createResource(createResource!, +id)
            .then(resource=> res.status(202).json(resource))
            .catch(err => this.getErrorMessage(err, res));
    };  

    getAllRecource=(_:Request, res:Response)=>{
        
        this.resourceService.getAllRecource()
            .then(resource => res.status(202).json(resource))
            .catch(err=> this.getErrorMessage(err, res));
    };
};