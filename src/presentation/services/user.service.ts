import { User } from "../../data";
import { CustomError} from "../../domain";
import { UserCreateUserDto } from "../../domain/dtos/create-player.dto";


export class UserServices {
    constructor(){};
    
    async create(userData : UserCreateUserDto) {
        const user = new User();

        user.email =  userData.email.toLowerCase().trim();
        user.username =  userData.username.toLowerCase().trim();
        user.password =userData.password;

        
        email : user.email

        return await User.findOne({
            where : {
                email : user.email,
                username : user.username
            }
        })
        .then(repetEmail => {
            if (repetEmail) {
                return Promise.reject(CustomError.badRequest("Email already registered."));
            };
            return user.save(); 
        })
        .then(user=> user)
        .catch(error => {
            return Promise.reject(error);
        });
    };
};