export class AddItem{
    constructor(
        public readonly name: string,
        public readonly description: string,
    ){};

    static create( object: { [key : string] : any } ): [string?, AddItem?] {

        const { name, description } = object;
    
        if(!name) return ['Missing name']
        if(!description ) return ['Missing itemId']
    
        return [undefined, new AddItem( name, description)]
      }
};