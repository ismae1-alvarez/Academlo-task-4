import { regularExps } from "../../../config";

export class UserCreateUserDto {
    constructor(
        public readonly email : string,
        public readonly username : string,
        public readonly password: string,
    ){};



    static create(object : {[key : string] : any}) : [string?, UserCreateUserDto?]{
        const {username, password, email}=  object;
        
        if(!username) return ["Missing username", undefined];
        if(!password) return ["Missing password", undefined];
        if(!email) return ["Missing email", undefined];
        if(!regularExps.email.test(email)) return ['Invalid email'];
        if(!regularExps.password.test(password)) return ['The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character']

        
        return [undefined, new UserCreateUserDto(email, username, password)];
    };
};