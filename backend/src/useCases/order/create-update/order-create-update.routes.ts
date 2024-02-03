import { OrderCreateUpdateValidation } from "./order-create-update.validation";
import { ValidationMiddleware } from "../../../application/middleware/validation-middleware";
import * as controller from "./order-create-update.controller";
import { Router } from "express";

export const OrderCreateUpdateRoutes = Router();

OrderCreateUpdateRoutes.post("/create", ValidationMiddleware(OrderCreateUpdateValidation), controller.execute);