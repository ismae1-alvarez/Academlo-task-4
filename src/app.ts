import { envs } from "./config";
import { PostgresDatabase } from "./data/postgres/postgres.database";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async()=>{
    main();
})();



export async function main() {
    

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
        port  : envs.PORT
    });

    await server.start()
};


















// export function sum(a:number, b:number) {
//     return a +b;
// };

// export function isEven(n:number) {
//     return n % 2 === 0;
// };


// export function divide(a:number, b:number){
//     if(b === 0) throw new Error("Cannot divide by zero");
//     return a / b;
// };


// export function multiply(a:number, b:number) {
//     return a * b;
// };

// export function concatenate(str1:any, str2:any) {
//     if(typeof str1 !== 'string' || typeof str2 !== 'string') throw new Error("El agumento debe ser un string");

//     return str1 + str2;
// };

// export function isPrime(number:any) {
//     if(typeof number !== 'number') throw new Error("El argumento debe ser un numero");

//     if(number <= 1) throw new Error("el argumento debe ser mayor a cero");

//     if(!Number.isInteger(number)) throw new Error("El valor debes ser sin decimales");


//     for (let i = 2; i < number; i++) {
//         if(number % i === 0){
//             return false;
//         };
//     };

//     return true;
// };