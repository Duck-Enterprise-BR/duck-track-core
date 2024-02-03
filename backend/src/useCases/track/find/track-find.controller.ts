import { TrackFindService } from "./track-find.service";
import { Request, Response } from "express";

export const execute = async (req: Request, res: Response): Promise<void> => {
    const service = new TrackFindService();
    const { code } = req.params;
    const result = await service.execute(code);
    res.status(result.status).send(result);
}