import { TrackApiCreateService } from "./track-api-create.service";
import { Request, Response } from "express";

export const execute = async (req: Request, res: Response): Promise<void> => {
    const service = new TrackApiCreateService();
    const data = await service.execute(res.locals["data"]);
    res.status(data.status).send(data);
}