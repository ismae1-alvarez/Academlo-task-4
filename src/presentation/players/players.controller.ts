import { Request, Response } from "express";

export class PlayersController {

    constructor(){};


    createPlayer(req:Request, res:Response){
        // Checar poder hacer algo por ahi 
        const value =  req.body.userSession.id;
        
    };  


};
