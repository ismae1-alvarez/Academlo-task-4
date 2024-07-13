import { envs } from "./config";
import { PostgresDatabase } from "./data/postgres/postgres.database";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async()=>{
    main();
})();



async function main() {
    

    const postgres =  new PostgresDatabase({
        host : envs.DB_HOST,
        port : envs.DB_PORT,
        username : envs.DB_USERNAME,
        password :  envs.DB_PASSWORD,
        database : envs.DB_DATABASE,
    });

    await postgres.connect()

    const server =  new Server({
        routes: AppRoutes.routes,
        port  : 3000
    });

    await server.start()
};