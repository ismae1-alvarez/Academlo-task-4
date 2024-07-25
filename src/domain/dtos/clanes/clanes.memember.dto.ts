export enum ClanMemberRole {
    MASTER = 'MASTER',
    OFFICER = 'OFFICER',
    SUBOFFICER = 'SUBOFFICER',
    MEMBER = 'MEMBER',
  }
  

export class ClanesMmemberDto{
    constructor(
        public readonly role : ClanMemberRole, 
        
    ){};

    static create(object :{[key:string ] : any}):[string?,ClanesMmemberDto?]{

        const {role} =  object;

        if(!role) return ["Missing Role", undefined];
        if(!(role in ClanMemberRole))  return ["Invalid Role", undefined];

        return [undefined, new ClanesMmemberDto(role)]
    };

};