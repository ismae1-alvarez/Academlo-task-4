import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../config";
import { Player, User } from "../data";

export class AuthMiddleware {
    static async protect(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header("Authorization");

        if (!authorization) return res.status(401).json({ message: "No token provided" });

        if (!authorization.startsWith("Bearer ")) return res.status(401).json({ message: "Invalid token" });

        const token = authorization.split(" ")[1];

        
        const payload = await JwtAdapter.validateToken<{ id: number }>(token);

        if (!payload) return res.status(401).json({ message: "Invalid token" });

        const user = await User.findOne({
            where :{
                id : payload.id
            }
        });

        if (!user) return res.status(401).json({ message: "Invalid user" });

        req.body.userSession = user;



        const player = await Player.findOne({
            where :{
                id : payload.id
            }
        });

        req.body.playerUser = player;
    
        next();
    };


    static restrictedAccess = (...roles: any) => {
        return (req: Request, res: Response, next: NextFunction) => {
          if (!roles.includes( req.body.playerUser.role)) {
            return res
              .status(403)
              .json({ message: "You are not authorized to access this route" });
          }
          next();
        };
      };
}
