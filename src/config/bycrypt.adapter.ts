import { compare, compareSync, genSaltSync, hashSync } from "bcryptjs";


export const bcryptAdapter = {
    hash : (password: string) : string =>{
        const salt = genSaltSync(12) // 12 de defecto
        return hashSync(password, salt);
    },

    compare :(bodyPassword :  string, hashedPassword : string):boolean=>{
        return compareSync(bodyPassword, hashedPassword);
    },
};