import { Request, Response } from "express";
import { ContructionsServices } from "../services/constructions.service";
import { ContructionsDto, CustomError } from "../../domain";

export class ContructionsController{
    constructor(private readonly contructionsServices: ContructionsServices){};


    private getErrorMessage =(error:unknown, res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:  error.message});
        };
        return res.status(500).json({message: 'Something went very wrong! 🧨'});
    };

    createContruction=(req:Request, res:Response)=>{    
        const {id} = req.body.playerUser

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        const [error, createContructions] = ContructionsDto.create(req.body);

        if(error) return res.status(422).json(error);

        this.contructionsServices.createContructions(createContructions!, +id)
            .then(construction=> res.status(202).json(construction))
            .catch(error => this.getErrorMessage(error, res))    
    };  

    getConstructionsById=(req:Request, res: Response)=>{
        const {id} = req.params;
        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        
    };
};