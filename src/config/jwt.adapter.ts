import jwt from "jsonwebtoken"
import { envs } from "./envs";


export class JwtAdapter{
    static async generateToken(payload : any, duration :string = '3'){

        return new Promise((resolve)=> {
            jwt.sign(payload, envs.JWT_SEED, {expiresIn:duration}, (err, token)=>{
                if(err || token === undefined) return resolve(null);
                resolve(token);
            });
        });

    };
};