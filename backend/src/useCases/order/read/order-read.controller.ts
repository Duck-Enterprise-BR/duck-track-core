import { Request, Response } from "express";
import { OrderReadService } from "./order-read.service";

export const execute = async (req: Request, res: Response): Promise<void> => {
    const service = new OrderReadService();
    const result = await service.execute(res.locals["user"]);
    res.status(result.status).send(result);
}