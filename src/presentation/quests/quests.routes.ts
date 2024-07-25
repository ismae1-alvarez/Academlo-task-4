import { Router } from "express";
import { QuestControlller } from "./quests.controller";
import { QuestServices } from "../services/quests.service";

export class QuestsRotes{
    static get routes ():Router{
        const router =  Router();


        const service = new QuestServices();
        const controller =  new QuestControlller(service);

        router.post("/quests/", controller.createQuest);
        router.post("/quests/:id/assing/", controller.asignateQuest);
        router.get("/players/:id/quests", controller.getPlayersQuests)


        return router;
    };
};