export class AddResource{
    constructor(
        public readonly name: string,
        public readonly description: string,
    ){};

    static create( object: { [key : string] : any } ): [string?, AddResource?] {

        const { name, description } = object;
    
        if(!name) return ['Missing name']
        if(!description ) return ['Missing itemId']
    
        return [undefined, new AddResource( name, description)]
      }
};