import { OrderCreateUpdateService } from "./order-create-update.service";
import { Request, Response } from "express";

export const execute = async (req: Request, res: Response): Promise<void> => {
    const service = new OrderCreateUpdateService();
    const result = await service.execute(res.locals["data"], res.locals["user"]);
    res.status(result.status).send(result);
}