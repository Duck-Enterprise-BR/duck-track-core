import { OrderDeleteService } from "./order-delete.service";
import { Request, Response } from "express";

export const execute = async (req: Request, res: Response): Promise<void> => {
    const service = new OrderDeleteService();
    const { id } = req.params;
    const result = await service.execute({ id: id });
    res.status(result.status).send(result);
}