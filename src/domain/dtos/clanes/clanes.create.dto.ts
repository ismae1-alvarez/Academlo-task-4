export class ClanesDto{
    constructor(
        public readonly name : string, 
        
    ){};

    static create(object :{[key:string ] : any}):[string?,ClanesDto?]{

        const {name} =  object;

        if(!name) return ["Missing name", undefined];

        return [undefined, new ClanesDto(name)]
    };

};