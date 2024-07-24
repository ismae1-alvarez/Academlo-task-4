import { Request, Response } from "express";
import { CustomError, PlayersCreateDto } from "../../domain";
import { PlayersServices } from "../services/player.service";

export class PlayersController {

    constructor(public readonly playerService :PlayersServices){};

    private getErrorMessage =(error:unknown, res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:  error.message});
        };
        return res.status(500).json({message: 'Something went very wrong! 🧨'});
    };

    createPlayer=(req:Request, res:Response)=>{
        const id =  req.body.userSession.id;

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        const [error, playerDto] = PlayersCreateDto.create(req.body); 
        
        if(error) return res.status(422).json(error);

        this.playerService.cratePlayers(playerDto!, +id)
            .then(player => res.status(202).json(player))
            .catch((error: unknown) => this.getErrorMessage(error, res));
    };  

    findOneById=(req:Request, res:Response)=>{
        const {id} = req.params;

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        this.playerService.findOneById(+id)
            .then(player => res.status(202).json(player))
            .catch((error: unknown) => this.getErrorMessage(error, res));      
    };


};
