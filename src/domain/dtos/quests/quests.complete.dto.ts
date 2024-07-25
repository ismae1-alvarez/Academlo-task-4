export class QuestComplete{
    constructor(
        public readonly completed : boolean,
        public readonly name : string, 

        
    ){};

    static create(object: {[key : string] : any}) :[string?, QuestComplete?]{

        const {completed, name} = object;


        if(!completed) return ["Missing complete", undefined];
        if(!name) return ["Missing complete", undefined];

        return [undefined, new QuestComplete(completed, name)];
    };

    
};