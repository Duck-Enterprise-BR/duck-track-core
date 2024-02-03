import * as controller from "./user-validate.controller";
import { Router } from "express";

export const UserValidateRoutes = Router();
UserValidateRoutes.get("/validate", controller.execute);