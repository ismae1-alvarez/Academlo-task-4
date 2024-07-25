import { Construction, Player } from "../../data";
import { ContructionsDto, CustomError } from "../../domain";
import { PlayersServices } from "./player.service";

export class ContructionsServices{
    constructor(private readonly playersServices : PlayersServices){};

    async createContructions(dataContruction:ContructionsDto, id:number){
        const player = await this.playersServices.findOneById(id);

        const contructions = new Construction()

        contructions.name = dataContruction.name;
        contructions.type = dataContruction.type;
        contructions.location =  dataContruction.location,
        contructions.level =  dataContruction.level;
        contructions.player =  player;

        return await contructions.save();
    };

    async getConstructionsById(id:number) {
        
        const contructions = Player.findOne({
            where:{id},
            relations: {
                constructions: true,
            },

        })
        
        if(!contructions) throw CustomError.notFound("No Existe niguna contruccion");

        return contructions;
    };
};