import { Request, Response } from "express"
import { HttpStatusCode } from "axios"

export const execute = async (req: Request, res: Response): Promise<void> => {
    res.status(HttpStatusCode.Accepted).send({ res: "ok" });
}