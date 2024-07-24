export class PlayersCreateDto{

    constructor(
        public readonly name : string
    ){};

    static create(object : {[key:string]:any}):[string?, PlayersCreateDto?]{
        const {name}= object;

        if(!name)  return ["Missing name", undefined];
    


        return [undefined, new PlayersCreateDto(name)]
    };  

};