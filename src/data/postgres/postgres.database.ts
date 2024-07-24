import { DataSource } from "typeorm";
import { User } from "./models/user.model";
import { Player } from "./models/player.model";
import { Clan } from "./models/clans.model";
import { ClanMember } from "./models/clanMember.model";
import { Construction } from "./models/construction.model";
import { Inventory } from "./models/inventory.model";
import { Item } from "./models/item.model";
import { Quest } from "./models/quest.model";
import { Quest_player } from "./models/questPlayer.model";
import { Resource } from "./models/resource.model";
import { Inventory_item } from "./models/inventoryItem.model";
import { Inventory_resource } from "./models/inventoryResource.model";


interface Option {
    host : string;
    port : number;
    username: string;
    password :  string;
    database: string;
};


export class PostgresDatabase {
    private datasource : DataSource;

    constructor(option:Option){
        this.datasource =  new DataSource({
            type : "postgres",
            host : option.host,
            port : option.port,
            username : option.username,
            password :  option.password,
            database :  option.database,

            entities :[User, Player, Clan, ClanMember, Construction, Inventory, Item, Quest, Quest_player, Resource,Inventory_item,
                Inventory_resource,],

            synchronize: true,
            // ssl : false
        });
    };

    async connect (){
        try {
            await this.datasource.initialize();
            console.log("connect to database")
        } catch (error) {
            console.log(error)
        }
    };
};