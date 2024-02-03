import { Request, Response } from "express";
import { UserCreateService } from "./user-create.service";

export const execute = async (req: Request, res: Response): Promise<void> => {
    const service = new UserCreateService();
    const result = await service.execute(res.locals["data"]);
    res.status(result.status).send(result);
}