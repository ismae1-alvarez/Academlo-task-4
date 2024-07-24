import { bcryptAdapter, JwtAdapter } from "../../config";
import { User } from "../../data";
import { CustomError, UserCreateUserDto, UserLoginUserDto} from "../../domain";


enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'   
};


export class UserServices {
    constructor(){};
    
    async create(userData : UserCreateUserDto) {
        const {email, username} =  userData;

        const user = new User();

        user.email =  userData.email;
        user.username =  userData.username;
        user.password =userData.password;

        const existUser = await User.findOne({
            where: [
              { email },
              { username }
            ]
          });
      
          if (existUser) {
            if (existUser.email === email) throw CustomError.badRequest("This email is already taken");
            if (existUser.username === username) throw CustomError.badRequest("This username is already taken");
          };
      
        await user.save();

        await this.sendEmailValidationLink(user.email);

        const token =  await JwtAdapter.generateToken({id:user.id});

        if(!token) return Promise.reject(CustomError.internalServer("Error While Creating JWT"));

        return {token, user};
    };


    async loginUser(login:UserLoginUserDto){
        const { email, username, password } = login;

        const user = await User.findOne({
            where: [
              { email },
              { username }
            ]
          });

          const isMatching = bcryptAdapter.compare(password, user!.password)
          if (!isMatching) throw CustomError.unAuthorized("Invalid email or password")
          const token = await JwtAdapter.generateToken({ id: user!.id })
          if (!token) throw CustomError.internalServer("Error while creating JWT");
        
          return {
              token,
              user: {
                id: user!.id,
                username: user!.username,
                email: user!.email,
              }
            }            
    };

    async getAllUser(){

      const user = await User.findOne({
        where : {
          status :  Status.ACTIVE
        }
      })

      if(!user)throw CustomError.unAuthorized("No Hay ningun usuario creado");

      return user;
    };

    async getAllUseById(id:number){

      const user = await User.findOne({
        where : {
          id,  
          status :  Status.ACTIVE
        }
      });

      if(!user)throw CustomError.unAuthorized("No existe el usuario");

      return user;
    };



    sendEmailValidationLink = async (email:string)=>{

        const token = await JwtAdapter.generateToken({email});

        if(!token) throw CustomError.internalServer("Error gatting token");
        return true;
    };
};