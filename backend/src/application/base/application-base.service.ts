import { Schema, Response, Model } from "sp-validator-tool";
import { ApplicationBaseResponse } from "./application-base.response";

export class ApplicationBaseService {
    protected async execute(data: any, user: any): Promise<ApplicationBaseResponse<any>> {
        return new ApplicationBaseResponse();
    }
    protected validation(data: any, schema: Schema): Response {
        const validator = new Model(schema);
        return validator.validate(data);
    }
}