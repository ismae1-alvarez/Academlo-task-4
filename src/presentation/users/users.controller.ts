import { CustomError } from "../../domain";
import { Response, Request } from "express";
import { UserServices } from "../services/user.service";
import { UserCreateUserDto } from "../../domain/dtos/create-player.dto";


export class UserController {
    
    constructor(
        public readonly userServices :  UserServices
    ){};

    private getErrorMessage =(error:unknown, res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:  error.message});
        };
        return res.status(500).json({message: 'Something went very wrong! 🧨'});
    };

    createUser = (req:Request, res:Response)=>{
        const [error, createUserDto] = UserCreateUserDto.create(req.body);
      
        if(error) return res.status(422).json(error);
        this.userServices.create(createUserDto!)
            .then(user => res.status(200).json(user))
            .catch((error: unknown) => this.getErrorMessage(error, res));

    };

    getAllUsers = (_:Request, res: Response)=>{

    };

    getUserById = (req:Request, res :Response)=>{
      
    };

    updateUserById = (req:Request, res :Response)=>{
        const {id} =  req.params;

    };

    deleteUserById=(req:Request, res:Response)=>{
        const {id} =  req.params;

       
    };


};