import { ValidationMiddleware } from "../../../application/middleware/validation-middleware";
import { UserCreateValidation } from "./user-create.validation";
import { execute } from "./user-create.controller";
import { Router } from "express";

export const UserCreateRoutes = Router();

UserCreateRoutes.post("/create", ValidationMiddleware(UserCreateValidation), execute);