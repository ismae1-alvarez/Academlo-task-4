export class QuestDto{
    constructor(
        public readonly name : string, 
        public readonly description :  string, 
        public readonly reward : string, 
        public readonly exp : number
    ){};

    static create(object: {[key : string] : any}) :[string?, QuestDto?]{

        const {name, description, reward, exp} = object;


        if(!name) return ["Missing name", undefined];
        if(!description) return ["Missing description", undefined];
        if(!reward) return ["Missing reward", undefined];
        if(!exp) return ["Missing exp", undefined];
        if(isNaN(exp)) return ["Type number values", undefined];

        return [undefined, new QuestDto(name, description, reward, exp)];
    };

    
};