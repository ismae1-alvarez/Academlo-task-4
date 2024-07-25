import { Request, Response } from "express";
import { QuestServices } from "../services/quests.service";
import { CustomError, QuestComplete, QuestDto } from "../../domain";


export class QuestControlller{
    constructor(private readonly questServices : QuestServices){};


    private getErrorMessage =(error:unknown, res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:  error.message});
        };
        return res.status(500).json({message: 'Something went very wrong! 🧨'});
    };

    createQuest=(req:Request, res:Response)=>{
        const [error, createQuest] = QuestDto.create(req.body);

        const  {id} = req.body.playerUser;

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        if(error) return res.status(422).json(error);

        this.questServices.createQuest(createQuest!, +id)
            .then(quest=> res.status(202).json(quest))
            .catch(error => this.getErrorMessage(error, res));
    };

    asignateQuest=(req:Request, res:Response)=>{
        const  {id} = req.params;

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        const [ error, questCompleteTask] =  QuestComplete.create(req.body);

        if(error) return res.status(422).json(error);

        this.questServices.asignateQuest(questCompleteTask!, +id)
            .then(quest=> res.status(202).json(quest))
            .catch(error => this.getErrorMessage(error, res));
    };

    getPlayersQuests=(req:Request, res:Response)=>{
        const  {id} = req.params;

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});


        this.questServices.getPlayersQuests(+id)
            .then(quest=> res.status(202).json(quest))
            .catch(error => this.getErrorMessage(error, res));
    };
};
