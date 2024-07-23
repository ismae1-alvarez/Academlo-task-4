
export class UserLoginUserDto {
    constructor(
        public readonly email : string,
        public readonly username : string,
        public readonly password: string,
    ){};



    static login(object : {[key : string] : any}) : [string?, UserLoginUserDto?]{
        const {username, password, email}=  object;
        
        if(!username) return ["Missing username", undefined];
        if(!password) return ["Missing password", undefined];
        if(!email) return ["Missing email", undefined];
        return [undefined, new UserLoginUserDto(email, username, password)];
    };
};