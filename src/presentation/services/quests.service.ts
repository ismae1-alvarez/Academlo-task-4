import { Player, Quest, Quest_player } from "../../data";
import { CustomError, QuestComplete, QuestDto } from "../../domain";

export class QuestServices{
    constructor(){};

    async createQuest(questData:QuestDto, id:number){
        const playerPromise = this.getPlayerById(id);
        const questPromise = this.getQuestByName(questData.name);

        const [player, questName] = await Promise.all([playerPromise, questPromise]);


        const quest = new Quest();

        quest.name = questData.name;
        quest.description =  questData.description;
        quest.reward = questData.reward;
        quest.exp =  questData.exp;

        return await quest.save()
        
    };


    async asignateQuest(questData : QuestComplete, id:number){

        const player = await this.getPlayerById(id);

        const quest = await this.getQuestByNameAsigne(questData.name);

        const questsPlayer = new Quest_player();
        questsPlayer.completed = questData.completed;
        questsPlayer.player = player!;
        questsPlayer.quest = quest;


        const savedQuestPlayer = await questsPlayer.save();
        return savedQuestPlayer;

    };

    async getPlayersQuests(id:number){
        const player = await Player.findOne({
            where:{id}, 
            relations : ["quest_players"]
        })
        if(!player)throw CustomError.notFound("No  esxiste ese nombre del quest");
        return player;
    };

    async getQuestByName(name: string){
        const nombre = await Quest.findOne({
            where : {name}
        });

        if(nombre) throw CustomError.notFound("Ya esxiste ese nombre del quest");

        return nombre;

    };

    async getQuestByNameAsigne(name: string){
        const nombre = await Quest.findOne({
            where : {name}
        });

        if(!nombre) throw CustomError.notFound("No  esxiste ese nombre del quest");

        return nombre;

    };

    async getPlayerById(id:number){

        const player = Player.findOne({
            where : {id}
        });

        if(!player) throw CustomError.notFound("Player not found");

        return player;
    };
};