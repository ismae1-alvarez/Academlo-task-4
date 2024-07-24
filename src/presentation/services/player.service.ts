import { Player } from "../../data";
import { CustomError, PlayersCreateDto } from "../../domain";
import { UserServices } from "./user.service";

export class PlayersServices{
    constructor(public readonly userServices:UserServices){};
    

    async cratePlayers(playerDto :PlayersCreateDto, id: number){

       const userPromise = await this.userServices.getAllUseById(id);

        
       const playerPrmise = await this.findPlayerByName(playerDto.name)

        const [ userData, _] =  await Promise.all([userPromise, playerPrmise])
        console.log(playerDto.name)

        const player = new Player();

        player.user =  userData;
        player.name =  playerDto.name

        return player.save();
    }; 

    async findOneById(id:number){
        const player = await Player.findOne({
            where : {id}, 
            relations :["user", "clanMembers", "clanMembers.clan"], 
            select :{
                user :{
                    id:true, 
                    username :true,
                    email: true,
                }
            }
        });

        if(!player) throw CustomError.notFound('Player no found');

        return player
    };

    async findOneInventoryByPlayerId(id: number){

        const player = await Player.findOne({
          where: {
            id
          },
        //   relations: ['inventory']
        })
    
        if(!player) throw CustomError.notFound("Player not found")
    
        const inventory = player.inventory;
    
    
        return inventory;
    
      }
    
    async findPlayerByName(name:string){
        const player =  await Player.findOne({
            where : {
                name
            }
        });

        if (player) throw CustomError.badRequest("This name is already taken")


        return player;
    }
};