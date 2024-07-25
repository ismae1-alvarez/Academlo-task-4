export class ContructionsDto{
    constructor(
        public readonly name : string, 
        public readonly type : string,
        public readonly location : string,
        public readonly level : number,
    ){};

    static create(object :{[key:string ] : any}):[string?,ContructionsDto?]{

        const {name, type, location, level} =  object;

        if(!name) return ["Missing name", undefined];
        if(!type) return ["Missing type", undefined];
        if(!location) return ["Missing location", undefined];
        if(!level) return ["Missing level", undefined];
        if(isNaN(level)) return ["Type Number", undefined];


        return [undefined, new ContructionsDto(name, type, location, level)]
    };

};