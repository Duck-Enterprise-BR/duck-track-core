import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "axios";
import { Schema, Model } from "sp-validator-tool";

export const ValidationMiddleware = (validatorSchema: Schema) => {
    return function (req: Request, res: Response, next: NextFunction): void {
        const model = new Model(validatorSchema);
        const result = model.validate(req.body, true);

        if (result.errorsCount > 0) {
            const responses: string[] = [];
            for (const item of result.validations) {
                if (item.errors[0]) {
                    responses.push(`${item.field} ${item.errors[0].message}`);
                }
            }
            res.status(HttpStatusCode.BadRequest).send(responses);
            return;
        }

        res.locals["data"] = result.output;
        next();
    }
}