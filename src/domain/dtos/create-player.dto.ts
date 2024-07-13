
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
        
        




        return [undefined,new UserCreateUserDto(username, password, email)];
    };
};