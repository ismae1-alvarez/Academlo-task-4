import { testServer } from "../test-server";
import {PostgresDatabase} from "../../src/data/index";
import { envs } from "../../src/config";
// import  request  from "supertest";


describe("Authh route testing", ()=>{

    beforeAll(async()=>{
        await testServer.start()
        // await new PostgresDatabase({
        //     host : envs.DB_HOST,
        //     port : envs.DB_PORT,
        //     username : envs.DB_USERNAME,
        //     password :  envs.DB_PASSWORD,
        //     database : envs.DB_DATABASE,
        // }).connect()
    });
});