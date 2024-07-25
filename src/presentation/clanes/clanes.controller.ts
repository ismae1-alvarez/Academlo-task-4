import { Request, Response } from "express";
import { ClanesServices } from "../services/clanes.service";
import { ClanesMmemberDto, CustomError, ClanesDto } from "../../domain";

export class ClanesController{
    constructor(private readonly clanesServices: ClanesServices){};


    private getErrorMessage =(error:unknown, res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:  error.message});
        };
        return res.status(500).json({message: 'Something went very wrong! 🧨'});
    };


    createClanes =(req:Request, res:Response)=>{
        const {id} = req.body.playerUser;

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        const [error, clanesDto] = ClanesDto.create(req.body);

        if(error) return res.status(422).json(error);


        this.clanesServices.createClan(clanesDto!, id)
            .then(clan => res.status(202).json(clan))
            .catch(error=> this.getErrorMessage(error, res));
    };


    createClanMemmber=(req:Request, res:Response)=>{
        const {id} = req.params;

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        const [error, clanesDto] = ClanesMmemberDto.create(req.body);

        if(error) return res.status(422).json(error);

        this.clanesServices.createClanMember(clanesDto!, +id)
            .then(clanMember => res.status(202).json(clanMember))
            .catch(error => this.getErrorMessage(error, res));
    };

    getClanesMember=(req:Request, res:Response)=>{
        const {id} = req.params;

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        this.clanesServices.getClanId(+id)
            .then(clanMember => res.status(202).json(clanMember))
            .catch(error => this.getErrorMessage(error, res));

    };
};