import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "axios";
import { UserModel } from "../../useCases/user/user.model";
import jwt from "jsonwebtoken";

export const AuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const header = req.headers["authorization"];

    if (typeof header !== "undefined" && header.startsWith("Bearer ")) {
        const token = header.split(" ")[1];

        const payload = <{ _id: string }>jwt.decode(token);

        const user = await UserModel.findById(payload?._id ?? "").exec();

        if (user) {
            res.locals["user"] = user;
            next();
            return;
        }

        res.status(HttpStatusCode.Unauthorized).send();

        return;
    }

    res.status(HttpStatusCode.Unauthorized).send();
}