import { Clan, ClanMember, Player } from "../../data";
import { ClanesMmemberDto, CustomError, PlayersCreateDto } from "../../domain";
import { ClanesDto } from "../../domain/dtos/clanes/clanes.create.dto";

export class ClanesServices {

    constructor(){};

    async createClan(dataClans:ClanesDto, id:number){

        //No se si me esta siviento esto
        await this.getPlayerById(id);

        const clan =  new Clan();

        clan.name =  dataClans.name;
        
        return await clan.save()

    };


    async getPlayerById(id:number){

        const player = Player.findOne({
            where : {id}
        });

        if(!player) throw CustomError.notFound("Player not found");

        return player;
    };

    async getClanId (id:number ){
        const clan = Clan.findOne({
            where :{ id},
            relations : ['clanMembers']
        })

        if(!clan) throw CustomError.notFound("Clan not found");

        return clan;
    };


    async createClanMember(clanMember:ClanesMmemberDto, id:number){
        const player  =  await this.getPlayerById(id);

        const clanFindOneid = await this.getClanId(player!.id)

        const clan = new ClanMember();

        clan.role =  clanMember.role.toUpperCase().trim();
        clan.player =  player!;
        clan.clan = clanFindOneid!;


        return await clan.save();

    

    };

};