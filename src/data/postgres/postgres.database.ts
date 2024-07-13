import { DataSource } from "typeorm";
import { User } from "./models/user.models";
import { Player } from "./models/player.model";


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

            entities :[User, Player],

            synchronize: true,
            ssl : false
        });
    };

    async connect (){
        try {
            await this.datasource.initialize();
            console.log("connect to database")
        } catch (error) {
            console.log("fsfds")
            console.log(error)
        }
    };
};