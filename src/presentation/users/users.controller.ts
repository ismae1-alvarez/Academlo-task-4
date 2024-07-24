import { CustomError, UserCreateUserDto, UserLoginUserDto } from "../../domain";
import { Response, Request } from "express";
import { UserServices } from "../services/user.service";


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

    login=(req:Request, res:Response)=>{
        const [error, loginUserDto] = UserLoginUserDto.login(req.body);

        if(error) return res.status(422).json(error);

        this.userServices.loginUser(loginUserDto!)
            .then(user => res.status(200).json(user))
            .catch((error: unknown) => this.getErrorMessage(error, res));
    };

    getAllUser=(_:Request, res:Response)=>{
        
        this.userServices.getAllUser() 
            .then(users => res.status(202).json(users))
            .catch((error: unknown) => this.getErrorMessage(error, res));
    };

    getAllUseById=(req:Request, res:Response)=>{
        const {id} = req.params;

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        this.userServices.getAllUseById(+id) 
            .then(users => res.status(202).json(users))
            .catch((error: unknown) => this.getErrorMessage(error, res));
    };

};